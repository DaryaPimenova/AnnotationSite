from django.db import models


class Style(models.Model):
    title = models.CharField('Стиль', max_length=64, unique=True)

    class Meta:
        verbose_name = 'Стиль изображений'
        verbose_name_plural = 'Стили изображений'

    def __str__(self):
        return self.title
