from django.core.files import File
from django.db import models


class Image(models.Model):
    image_file = models.ImageField(u'Изображение', upload_to='annotated_images')

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    @classmethod
    def tmp_add_image(cls, path_to_file):
        f = open(path_to_file, 'rb')
        django_file = File(f)
        new_image = cls()
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)
