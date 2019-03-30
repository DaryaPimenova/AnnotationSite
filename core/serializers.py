from rest_framework import serializers
from core.models import Image, Annotation


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
