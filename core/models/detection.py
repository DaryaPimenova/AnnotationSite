from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Detection(models.Model):
    image = models.ForeignKey('Image', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_class = models.ForeignKey('ImageClass', on_delete=models.SET_NULL, blank=True, null=True)

    x1 = models.PositiveSmallIntegerField()
    y1 = models.PositiveSmallIntegerField()
    x2 = models.PositiveSmallIntegerField()
    y2 = models.PositiveSmallIntegerField()

    class Meta:
        verbose_name = 'Детекция'
        verbose_name_plural = 'Детекции'
