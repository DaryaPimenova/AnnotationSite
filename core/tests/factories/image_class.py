import factory.fuzzy
from core.models import ImageClass


class ImageClassFactory(factory.DjangoModelFactory):
    title = factory.Sequence(lambda x: f"image-class-{x}")

    class Meta:
        model = ImageClass
