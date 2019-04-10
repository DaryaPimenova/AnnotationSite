from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from core.models import Image

from .serializers import ImageSerializer, AnnotationSerializer


class ImageAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def get_object(self):
        return self.request.user.get_random_image()



class ImageDeleteAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        # TODO: нужно переделать на стандарт
        # файл с картинкой тоже нужно удалить

        image_id = request.data['image_id']
        image = Image.objects.get(pk=image_id)
        image.delete()

        return Response({
            'image': ImageSerializer(request.user.get_random_image()).data
        })


class AnnotationSaveAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AnnotationSerializer

    def post(self, request, *args, **kwargs):
        image_id = request.data['image_id']
        annotations = self.__prepare_data(request.data, image_id)

        with transaction.atomic():
            for annotation in annotations:
                serializer = self.get_serializer(data=annotation)
                serializer.is_valid(raise_exception=True)
                serializer.save(image_id=image_id, user=request.user)

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
            y =  geometry['y']
            width = geometry['width']
            height = geometry['height']

            annotations.append({
                'sense': data.get('sense', ''),
                'style': data.get('style', ''),
                'remark': data.get('remark', ''),
                'left': round((x * image.width) / 100),
                'top': round((y * image.height) / 100),
                'right': round(((x + width) * image.width) / 100),
                'bottom': round(((y + height) * image.height) / 100),
            })

        return annotations
