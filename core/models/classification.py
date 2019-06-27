from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Classification(models.Model):
    image = models.ForeignKey('Image', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_class = models.ForeignKey('ImageClass', on_delete=models.SET_NULL, blank=True, null=True)
    style = models.ForeignKey('Style', on_delete=models.SET_NULL, blank=True, null=True)
    technique = models.ForeignKey('Technique', on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = 'Классификация'
        verbose_name_plural = 'Классификации'
