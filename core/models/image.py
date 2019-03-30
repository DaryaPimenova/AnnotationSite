from django.core.files import File
from django.db import models
import PIL


class Image(models.Model):
    image_file = models.ImageField(u'Изображение', upload_to='annotated_images')
    class_img = models.CharField(u'Класс', max_length=64, default='')
    height = models.IntegerField(u'Высота', default=0)
    width = models.IntegerField(u'Ширина', default=0)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    @classmethod
    def create_from_path(cls, path_to_file, class_image):
        f = open(path_to_file, 'rb')
        tmp_img = PIL.Image.open(path_to_file)
        django_file = File(f)
        new_image = cls(
            class_img=class_image, 
            height=tmp_img.height, 
            width=tmp_img.width
        )
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)
