from rest_framework import serializers
from core.models import Image, ImageClass, Annotation, Style


class ImageClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageClass
        fields = ('pk', 'title')


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ('pk', 'title')


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image_id = serializers.SerializerMethodField()
    style = StyleSerializer()
    classes = ImageClassSerializer(many=True)

    class Meta:
        model = Image
        fields = ('image_id', 'image_url', 'style', 'classes')

    @staticmethod
    def get_image_url(obj):
        return obj.image_file.url

    @staticmethod
    def get_image_id(obj):
        return obj.pk


class AnnotationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Annotation
        fields = ('sense', 'bottom', 'left', 'top', 'right')
