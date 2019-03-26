from rest_framework import permissions, generics
from rest_framework.response import Response
from django.db import transaction

from knox.models import AuthToken

from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, ImageSerializer, AnnotationSerializer


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ImageAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ImageSerializer

    def get_object(self):
        print(self.request.user)
        return self.request.user.get_random_non_annotated_image()


class AnnotationSaveAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AnnotationSerializer

    def post(self, request, *args, **kwargs):
        image_id = request.data['image_id']
        annotations = self.__prepare_data(request.data)

        with transaction.atomic():
            for annotation in annotations:
                serializer = self.get_serializer(data=annotation)
                serializer.is_valid(raise_exception=True)
                serializer.save(image_id=image_id, user=request.user)

        return Response({
            'image': ImageSerializer(request.user.get_random_non_annotated_image()).data
        })

    def __prepare_data(self, data):
        annotations = []

        for ann in data['annotations']:
            data = ann['data']
            geometry = ann['geometry']

            annotations.append({
                'sense': data['sense'],
                'style': data['style'],
                'remark': data['remark'],
                'left': round(geometry['x']),
                'top': round(geometry['y']),
                'right': round(geometry['x'] + geometry['width']),
                'bottom': round(geometry['y'] + geometry['height']),
            })

        return annotations
