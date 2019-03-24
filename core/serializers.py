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


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class CreateAnnotationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = (
            'id', 'image', 'user', 'remark', 'style', 'sense', 'left', 'top', 'right', 'bottom'
        )

    def create(self, validated_data):
        annotation = Annotation.objects.create(
            image=validated_data['image'],
            user=validated_data['user'],
            remark=validated_data['remark'],
            style=validated_data['style'],
            sense=validated_data['sense'],
            left=validated_data['left'],
            top=validated_data['top'],
            right=validated_data['right'],
            bottom=validated_data['bottom'],
        )


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ('id', 'image_url')

    @staticmethod
    def get_image_url(obj):
        return obj.image_file.url
