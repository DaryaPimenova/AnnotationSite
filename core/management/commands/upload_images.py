from django.core.management.base import BaseCommand
from core.models import Image
import os


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--image-folder', type=str)

    def handle(self, *args, **options):
        print('\nSTART\n\n')

        image_folder = options.get('image_folder')

        if not image_folder:
            print(
                'Укажите путь к папке с загружаемыми изображениями!\n' 
                '(например: python manage.py upload_images --image-folder="/home/user/image_folder")'
            )
            return

        images = []

        for image in os.listdir(image_folder):
            full_path = os.path.join(image_folder, image)
            images.append(full_path)

        for path_to_image in images:
            Image.create_from_path(path_to_image)

        print('\n\nFINISH\n')
