from django.db import models


class ImageClass(models.Model):
    title = models.CharField('Класс', max_length=64, default='')

    class Meta:
        verbose_name = 'Класс изображений'
        verbose_name_plural = 'Классы изображений'

    def __str__(self):
        return self.title
