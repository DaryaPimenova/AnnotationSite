import factory.fuzzy
from core.models import Image


class ImageFactory(factory.DjangoModelFactory):

    class Meta:
        model = Image
