from django.db import models


class Image(models.Model):
    image_file = models.ImageField(u'Изображение', upload_to='annotated_images')

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'
