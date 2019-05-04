from django.db import models


class ImageClass(models.Model):
    PEOPLE = 'люди'
    DOGS = 'собаки'
    CATS = 'кошки'
    TREES = 'деревья'
    BIRDS = 'птицы'


    title = models.CharField('Класс', max_length=64, default='')

    class Meta:
        verbose_name = 'Класс изображений'
        verbose_name_plural = 'Классы изображений'

    def __str__(self):
        return self.title

    @classmethod
    def classes_for_classification(cls):
        return cls.objects.filter(title__in=('люди', 'собаки', 'кошки', 'деревья', 'птицы'))
    