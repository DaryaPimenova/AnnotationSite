from django.core.files import File
from django.db import models
from core.managers import ImageManager


class Image(models.Model):
    image_file = models.ImageField(u'Изображение', upload_to='annotated_images')

    objects = ImageManager()

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'
