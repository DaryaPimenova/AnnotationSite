from rest_framework import serializers
from core.models import Classification, Detection, Image, ImageClass, Style, Technique


class TechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technique
        fields = ('pk', 'title')


class ImageClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageClass
        fields = ('pk', 'title')


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ('pk', 'title')


class ImageGallerySerializer(serializers.ModelSerializer):
    src = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ('src', 'height', 'width')

    @staticmethod
    def get_src(obj):
        return obj.image_file.url


class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image_id = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = ('image_id', 'image_url', 'height', 'width')

    @staticmethod
    def get_image_url(obj):
        return obj.image_file.url

    @staticmethod
    def get_image_id(obj):
        return obj.pk


class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = ('x1', 'y1', 'x2', 'y2')


class ClassificationSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    style = StyleSerializer()
    image_class = ImageClassSerializer()
    technique = TechniqueSerializer()

    class Meta:
        model = Classification
        fields = ('image', 'style', 'image_class', 'technique')
