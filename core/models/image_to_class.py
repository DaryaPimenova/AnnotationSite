from django.db import models


class ImageToClass(models.Model):
    image = models.ForeignKey('Image', on_delete=models.CASCADE)
    image_class = models.ForeignKey('ImageClass', on_delete=models.CASCADE)

    class Meta:
        db_table = 'image_to_class'
        unique_together = (("image", "image_class"),)
