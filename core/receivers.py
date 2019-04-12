from django.db.models.signals import pre_delete
from django.dispatch import receiver
from core.models import Image


@receiver(pre_delete, sender=Image)
def delete_image(sender, instance, **kwargs):
    if instance.image_file.name:
        instance.image_file.delete(False)
