from django.http import HttpResponse
from rest_framework import permissions, generics, views
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q
from django.conf import settings
import os
import csv
from core.models import Image, Detection, Classification, ImageClass, Style, Technique
from io import BytesIO, StringIO
import zipfile

from .serializers import ImageSerializer, StyleSerializer, ImageClassSerializer, ClassificationSerializer, \
    DetectionSerializer, TechniqueSerializer, ImageGallerySerializer


class ImageAPI(generics.RetrieveAPIView):
    serializer_class = ImageSerializer

    def get(self, request, *args, **kwargs):
        is_classification = request.GET.get('is_classification') == 'true'
        classes = ImageClass.classes_for_classification() if is_classification else ImageClass.objects.all()
        image = Image.get_random_image()

        return Response({
            'image': ImageSerializer(image).data,
            'classes': ImageClassSerializer(classes, many=True).data
        })


class ImagesGalleryAPI(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        return Response({
            'images_gallery': ImageGallerySerializer(Image.objects.all(), many=True).data
        })


class BulkDeleteImagesAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        images = Image.objects.filter(pk__in=request.data['image_ids'])
        print(request.data['image_ids'])
        images.delete()
        return Response({
            'images_gallery': ImageGallerySerializer(Image.objects.all(), many=True).data
        })


class ImageDeleteAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        image = Image.objects.get(pk=request.data['image_id'])
        image.delete()

        is_classification = request.data.get('is_classification')
        classes = ImageClass.classes_for_classification() if is_classification else ImageClass.objects.all()

        return Response({
            'image': ImageSerializer(Image.get_random_image()).data,
            'classes': ImageClassSerializer(classes, many=True).data
        })


class DetectionsDownloadAPI(views.APIView):
    # Разобраться с permissions
    # permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        zip_file = BytesIO()
        with zipfile.ZipFile(zip_file, 'w') as f:
            for image in Image.objects.filter(pk__in=Detection.objects.values_list('image_id', flat=True)):
                absolute_path = image.image_file.path
                rel = absolute_path[len(settings.MEDIA_ROOT) + len(os.sep):]
                f.write(absolute_path, rel)

            output = StringIO()
            headers = ['Путь', 'Класс', 'x1', 'y1', 'x2', 'y2']

            csv_writer = csv.writer(output, delimiter=';')
            csv_writer.writerow(headers)

            for detection in Detection.objects.all().select_related('image'):
                row = [
                    detection.image.image_file.path[len(settings.MEDIA_ROOT) + len(os.sep):],
                    str(detection.image_class),
                    detection.x1,
                    detection.y1,
                    detection.x2,
                    detection.y2
                ]
                csv_writer.writerow(row)

            content = output.getvalue()
            f.writestr('detections.csv', content)

        response = HttpResponse(zip_file.getvalue())
        response['Content-Type'] = 'text/html; charset=utf-8'
        response['Content-Disposition'] = 'attachment; filename={}'.format(
            "detection_info.zip"
        )

        return response


class ClassificationsDownloadAPI(views.APIView):
    # Разобраться с permissions
    # permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        zip_file = BytesIO()
        with zipfile.ZipFile(zip_file, 'w') as f:
            for image in Image.objects.filter(pk__in=Classification.objects.values_list('image_id', flat=True)):
                absolute_path = image.image_file.path
                rel = absolute_path[len(settings.MEDIA_ROOT) + len(os.sep):]
                f.write(absolute_path, rel)

            output = StringIO()
            headers = ['Путь', 'Класс', 'Стиль', 'Техника']

            csv_writer = csv.writer(output, delimiter=';')
            csv_writer.writerow(headers)

            for classification in Classification.objects.all().select_related('image'):
                row = [
                    classification.image.image_file.path[len(settings.MEDIA_ROOT) + len(os.sep):],
                    str(classification.image_class),
                    classification.style,
                    classification.technique,
                ]
                csv_writer.writerow(row)

            content = output.getvalue()
            f.writestr('classification.csv', content)

        response = HttpResponse(zip_file.getvalue())
        response['Content-Type'] = 'text/html; charset=utf-8'
        response['Content-Disposition'] = 'attachment; filename={}'.format(
            "classification.zip"
        )

        return response


class StyleApi(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = StyleSerializer

    def get_queryset(self):
        filters = Q()
        q = self.request.query_params.get('q')
        if q:
            filters &= Q(title__contains=q.lower())

        return Style.objects.filter(filters)


class TechniqueApi(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = TechniqueSerializer

    def get_queryset(self):
        filters = Q()
        q = self.request.query_params.get('q')
        if q:
            filters &= Q(title__contains=q.lower())

        return Technique.objects.filter(filters)


class ClassificationAPI(generics.GenericAPIView):
    serializer_class = ClassificationSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        user = request.user
        if user.pk is None:
            user, _ = get_user_model().objects.get_or_create(username='anonymous_user')
       
        Classification.objects.create(
            user=user,
            image_id=data.get('image_for_classification'),
            technique_id=data.get('technique'),
            image_class_id=data.get('image_class'),
            style_id=data.get('style')
        )

        image = Image.get_random_image()

        return Response({
            'image': ImageSerializer(image).data,
            'classes': ImageClassSerializer(ImageClass.classes_for_classification(), many=True).data
        })


class DetectionSaveAPI(generics.GenericAPIView):
    serializer_class = DetectionSerializer

    def post(self, request, *args, **kwargs):
        image_id = request.data['image_id']
        detections = self.__prepare_data(request.data, image_id)
        user = request.user
        if user.pk is None:
            user, _ = get_user_model().objects.get_or_create(username='anonymous_user')

        with transaction.atomic():
            for detection in detections:
                # поправить, что это тоже передавалось в serializer
                image_class = detection.pop('image_class', None)
                serializer = self.get_serializer(data=detection)
                serializer.is_valid(raise_exception=True)
                serializer.save(image_class_id=image_class, image_id=image_id, user=user)

        return Response({
            'image': ImageSerializer(Image.get_random_image()).data,
            'classes': ImageClassSerializer(ImageClass.objects.all(), many=True).data
        })

    def __prepare_data(self, data, image_id):
        detections = []
        image = Image.objects.get(pk=image_id)

        for det in data['detections']:
            data = det['data']
            geometry = det['geometry']

            x = geometry['x']
            y = geometry['y']
            width = geometry['width']
            height = geometry['height']
            image_class = data.get('image_class')['value']

            detections.append({
                'sense': data.get('sense', ''),
                'image_class': image_class,
                'x1': round((x * image.width) / 100),
                'y1': round((y * image.height) / 100),
                'x2': round(((x + width) * image.width) / 100),
                'y2': round(((y + height) * image.height) / 100),
            })

        return detections


class StatisticsAPI(views.APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):

        return Response({
            'statistics_messages': [
                'Test message'
            ]
        })
        
        # return Response({
        #     'statistics_messages': [
        #         'Всего картинок: {}'.format(Image.objects.count()),
        #         'Поле "Стиль" заполнено у {}'.format(Image.objects.filter(style__isnull=False).count()),
        #         'Проставлен хотя бы один класс у {}'.format(Image.objects.filter(classes__isnull=False).count()),
        #         'Есть хотя бы одна аннотация у {}'.format(Image.objects.filter(annotation__isnull=False).count())
        #     ]
        # })
