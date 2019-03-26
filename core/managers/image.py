from django.db import models


class ImageManager(models.Manager):

    def create_from_path(self, path_to_file):
        f = open(path_to_file, 'rb')
        django_file = File(f)
        new_image = cls()
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)
