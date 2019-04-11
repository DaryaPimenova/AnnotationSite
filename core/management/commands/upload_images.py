from django.core.management.base import BaseCommand
from core.models import Image
import os
from django.db import transaction


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--image-folder', type=str)
        parser.add_argument('--annotation-file', type=str)

    @transaction.atomic
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

        for image in os.listdir(image_folder):
            full_path = os.path.join(image_folder, image)
            images.append(full_path)

        with open(annotation_file) as an_fi:
            for line in an_fi:
                style = image_classes = None

                line = line.strip().split(';')
                path = line[0].split('=')[1].strip()
                if len(line) == 3:
                    style = line[1].split('=')[1].strip().lower()
                    image_classes = self.get_image_classes(line[2])
                elif len(line) == 2:
                    image_classes = self.get_image_classes(line[1])

                annotations[path] = {
                    'style': style,
                    'image_classes': image_classes
                }

        for path_to_image in images:
            image_data = annotations.get(path_to_image)
            if image_data:
                style = image_data['style']
                image_classes = image_data['image_classes']
                if not image_classes:
                    raise Exception('Для картинки {} не указаны классы!'.format(path_to_image))
                Image.create_from_path(path_to_image, style, image_classes)
            else:
                raise Exception('Для картинки {} не указаны данные в файле!')

        print('\n\nFINISH\n')

    @staticmethod
    def get_image_classes(string):
        tmp = string.split('=')[1]  # получаем то, что в скобках
        tmp = tmp[1:-1]  # обрезаем скобки
        return [c.strip() for c in tmp.split(',')]
