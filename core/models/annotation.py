from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Annotation(models.Model):
    image = models.ForeignKey('Image', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    remark = models.CharField(u'Подпись', max_length=64, default='')
    style = models.CharField(u'Стиль', max_length=64, default='')
    sense = models.CharField(u'Смысл', max_length=128, default='')

    left = models.PositiveSmallIntegerField()
    top = models.PositiveSmallIntegerField()
    right = models.PositiveSmallIntegerField()
    bottom = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'annotation'
        verbose_name = 'Аннотация'
        verbose_name_plural = 'Аннотации'
