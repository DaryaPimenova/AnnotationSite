from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model


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

    @staticmethod
    def validate_username(username):
        # добавить валидацию
        return username

    @staticmethod
    def validate_email(email):
        # добавить валидацию
        return email

    @staticmethod
    def validate_password(password):
        # добавить валидацию
        return password


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
