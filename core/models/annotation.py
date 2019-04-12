from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Annotation(models.Model):
    image = models.ForeignKey('Image', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_class = models.ForeignKey('ImageClass', on_delete=models.CASCADE)
    sense = models.CharField('Смысл', max_length=128, default='')

    left = models.PositiveSmallIntegerField()
    top = models.PositiveSmallIntegerField()
    right = models.PositiveSmallIntegerField()
    bottom = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'annotation'
        verbose_name = 'Аннотация'
        verbose_name_plural = 'Аннотации'
