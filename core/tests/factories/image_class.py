import factory.fuzzy
from core.models import ImageClass


class ImageClassFactory(factory.DjangoModelFactory):

    class Meta:
        model = ImageClass
