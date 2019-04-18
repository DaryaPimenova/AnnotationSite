from django.contrib.auth.models import AbstractUser
from random import randint

from django.db.models import Q


class User(AbstractUser):

    class Meta:
        db_table = 'user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def get_random_image(self, image_id=None, annotation_user=None):
        """
        Выбираем случайную картинку
        """

        filters = Q(classes__isnull=False)
        return self.get_image(filters, image_id, annotation_user)

    def get_image_for_update(self, image_id=None, annotation_user=None):
        """
        Выбираем картинку для простановки стиля и классов
        """

        filters = Q(
            Q(style__isnull=True)
            | Q(classes__isnull=True)
        )
        return self.get_image(filters, image_id, annotation_user)

    def get_image(self, filters, image_id=None, annotation_user=None):
        from core.models import Image

        images = Image.objects.filter(filters)
        if annotation_user is not None:
            images = images.exclude(annotation__user=annotation_user)

        if image_id is not None:
            images = images.exclude(pk=image_id)

        img = None
        if images.exists():
            count = images.count()
            random_index = randint(0, count - 1)
            img = images[random_index]

        return img
