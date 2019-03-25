from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from core.models import Image, Annotation


User = get_user_model()


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image_id = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ('image_id', 'image_url')

    @staticmethod
    def get_image_url(obj):
        return obj.image_file.url

    @staticmethod
    def get_image_id(obj):
        return obj.pk


class AnnotationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Annotation
        fields = ('remark', 'style', 'sense', 'bottom', 'left', 'top', 'right')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")
