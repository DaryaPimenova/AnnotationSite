from django.contrib.auth.models import AbstractUser
from django.db import models
from random import randint


class User(AbstractUser):
    
    
    class Meta:
        db_table = 'user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def get_random_image(self, image_id=None, annotation_user=None):
        """
        Выбираем случайную картинку
        """
        from core.models import Image
        
        images = Image.objects.all()
        if annotation_user is not None:
            images = images.exclude(annotation__user=annotation_user)

        if image_id is not None:
            images = images.exclude(pk=image_id)

        count = images.count()
        random_index = randint(0, count - 1)

        return images[random_index]
