from django.core.files import File
from django.db import models
from PIL import Image as PIL_IMAGE
from random import randint
from django.db.models import Q


class Image(models.Model):
    image_file = models.ImageField('Изображение', upload_to='annotated_images')
    height = models.IntegerField('Высота', default=0)
    width = models.IntegerField('Ширина', default=0)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return '{} [{} X {}]'.format(self.image_file.path.split('/')[-1], self.height, self.width)

    @classmethod
    def create_from_path(cls, path_to_file):
        f = open(path_to_file, 'rb')
        tmp_img = PIL_IMAGE.open(path_to_file)
        django_file = File(f)

        new_image = cls(
            height=tmp_img.height, 
            width=tmp_img.width
        )
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)

    @classmethod
    def get_random_image(cls, exclude_image_ids=None):
        """
        Выбираем случайную картинку
        """

        img = None
        filters = Q()
        if exclude_image_ids is not None:
            filters &= Q(pk__in=exclude_image_ids)

        if cls.objects.exists():
            count = cls.objects.count()
            random_index = randint(0, count - 1)
            img = cls.objects.all()[random_index]

        return img
