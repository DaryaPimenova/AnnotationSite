from django.db import models
from random import randint


class ImageManager(models.Manager):

    def random_non_annotated(self, user):
        """
        Выбираем случайную картинку, которую пользователь до этого ещё не размечал
        """
        images = self.exclude(annotation__user=user)
        count = self.count()
        random_index = randint(0, count - 1)

        return self.all()[random_index]

    def create_from_path(self, path_to_file):
        f = open(path_to_file, 'rb')
        django_file = File(f)
        new_image = cls()
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)
