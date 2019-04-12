from django.core.files import File
from django.db import models
from PIL import Image as PIL_IMAGE
from core.models import ImageClass, ImageToClass, Style


class Image(models.Model):
    image_file = models.ImageField('Изображение', upload_to='annotated_images')
    style = models.ForeignKey('Style', related_name='images', on_delete=models.CASCADE, null=True, blank=True)
    classes = models.ManyToManyField('ImageClass',
                                     through='ImageToClass',
                                     verbose_name='Классы изображения',
                                     related_name='images')

    height = models.IntegerField('Высота', default=0)
    width = models.IntegerField('Ширина', default=0)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return '{} [{} X {}]'.format(self.image_file.path.split('/')[-1], self.height, self.width)

    @classmethod
    def create_from_path(cls, path_to_file, style, image_classes):
        f = open(path_to_file, 'rb')
        tmp_img = PIL_IMAGE.open(path_to_file)
        django_file = File(f)
        style, _ = Style.objects.get_or_create(title=style)
        new_image = cls(
            style=style,
            height=tmp_img.height, 
            width=tmp_img.width
        )
        new_image.image_file.save(path_to_file.split('/')[-1], django_file, save=True)

        for image_class in image_classes:
            img_class, _ = ImageClass.objects.get_or_create(title=image_class.strip().lower())
            ImageToClass.objects.create(image_class=img_class, image=new_image)
