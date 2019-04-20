from django.http import HttpResponse
from rest_framework import permissions, generics, views
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
import os
import csv
from core.models import Image, Annotation, Style, ImageClass, ImageToClass
from io import BytesIO, StringIO
import zipfile

from .serializers import ImageSerializer, ImageClassSerializer, StyleSerializer, AnnotationSerializer


class ImageAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def get(self, request, *args, **kwargs):
        is_updater = request.GET.get('is_updater') == 'true'
        image_getter = request.user.get_image_for_update if is_updater else request.user.get_random_image
        image = image_getter()

        return Response({
            'image': ImageSerializer(image).data
        })


class ImageDeleteAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        image_id = request.data['image_id']
        is_updater = request.data.get('is_updater')

        image = Image.objects.get(pk=image_id)
        image.delete()

        image_getter = request.user.get_image_for_update if is_updater else request.user.get_random_image

        return Response({
            'image': ImageSerializer(image_getter()).data
        })


class DownloadAPI(views.APIView):
    # Разобраться с permissions
    # permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        zip_file = BytesIO()
        with zipfile.ZipFile(zip_file, 'w') as f:
            for image in Image.objects.all():
                absolute_path = image.image_file.path
                rel = absolute_path[len(settings.MEDIA_ROOT) + len(os.sep):]
                f.write(absolute_path, rel)

            output = StringIO()
            headers = ['Путь', 'Стиль', 'Класс', 'Смысл', 'x1', 'y1', 'x2', 'y2']

            csv_writer = csv.writer(output, delimiter=';')
            csv_writer.writerow(headers)

            for annotation in Annotation.objects.all().select_related('image'):
                row = [
                    annotation.image.image_file.path[len(settings.MEDIA_ROOT) + len(os.sep):],
                    str(annotation.image.style),
                    str(annotation.image_class),
                    annotation.sense,
                    annotation.left,
                    annotation.top,
                    annotation.right,
                    annotation.bottom
                ]
                csv_writer.writerow(row)

            content = output.getvalue()
            f.writestr('annotations.csv', content)

        response = HttpResponse(zip_file.getvalue())
        response['Content-Type'] = 'text/html; charset=utf-8'
        response['Content-Disposition'] = 'attachment; filename={}'.format(
            "annotation_info.zip"
        )

        return response


class ImageDateAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        image = Image.objects.get(pk=data['image_for_update_id'])

        classes = [c.strip().lower() for c in data['classes'].split(',')]

        if all(classes):
            for image_class in classes:
                img_class, _ = ImageClass.objects.get_or_create(title=image_class)
                ImageToClass.objects.create(image_class=img_class, image=image)

        style_str = data['style'].strip().lower()
        if style_str:
            style, _ = Style.objects.get_or_create(title=data['style'].strip().lower())
            image.style = style
            image.save()

        return Response({
            'image': ImageSerializer(request.user.get_image_for_update()).data
        })


class AnnotationSaveAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AnnotationSerializer

    def post(self, request, *args, **kwargs):
        image_id = request.data['image_id']
        annotations = self.__prepare_data(request.data, image_id)

        with transaction.atomic():
            for annotation in annotations:
                # поправить, что это тоже передавалось в serializer
                image_class = annotation.pop('image_class', None)
                serializer = self.get_serializer(data=annotation)
                serializer.is_valid(raise_exception=True)
                serializer.save(image_class_id=image_class, image_id=image_id, user=request.user)

        return Response({
            'image': ImageSerializer(request.user.get_random_image()).data
        })

    def __prepare_data(self, data, image_id):
        annotations = []
        image = Image.objects.get(pk=image_id)

        for ann in data['annotations']:
            data = ann['data']
            geometry = ann['geometry']

            x = geometry['x']
            y = geometry['y']
            width = geometry['width']
            height = geometry['height']
            image_class = data.get('image_class')['value']

            annotations.append({
                'sense': data.get('sense', ''),
                'image_class': image_class,
                'left': round((x * image.width) / 100),
                'top': round((y * image.height) / 100),
                'right': round(((x + width) * image.width) / 100),
                'bottom': round(((y + height) * image.height) / 100),
            })

        return annotations
