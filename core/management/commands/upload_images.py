from django.core.management.base import BaseCommand
from core.models import Image
import os
from collections import defaultdict


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--image-folder', type=str)
        parser.add_argument('--annotation-file', type=str)

    def handle(self, *args, **options):
        print('\nSTART\n\n')

        image_folder = options.get('image_folder')
        annotation_file = options.get('annotation_file')

        if not image_folder:
            print(
                'Укажите путь к папке с загружаемыми изображениями!\n' 
                '(например: --image-folder="/home/user/image_folder")'
            )
            return

        if not annotation_file:
            print(
                'Укажите путь к файлу формата txt, в котором соответствующей картинке проставлен класс\n'
                '(например: --annotation-file="/home/user/annotation_file.txt")'
            )
            return

        images = []
        annotations = {}
        errors = []

        for image in os.listdir(image_folder):
            full_path = os.path.join(image_folder, image)
            images.append(full_path)

        with open(annotation_file) as an_fi:
            for line in an_fi:
                path, class_image = line.split(',')
                annotations[path.strip()] = class_image.strip()

        for path_to_image in images:
            class_image = annotations.get(path_to_image)
            if class_image:
                Image.create_from_path(path_to_image, class_image)
            else:
                errors.append(path_to_image)

        if errors:
            print('Некоторые картинки не удалось загрузить (не нашлось соответствия в файле {})'.format(annotation_file))
            for error in errors:
                print(error)

        print('\n\nFINISH\n')
        