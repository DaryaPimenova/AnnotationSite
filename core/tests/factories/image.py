import factory.fuzzy
from core.models import Image


class ImageFactory(factory.DjangoModelFactory):
    height = factory.fuzzy.FuzzyInteger(1, 2048)
    width = factory.fuzzy.FuzzyInteger(1, 2048)
    image_file = factory.django.ImageField(
        from_path=os.path.join(settings.BASE_DIR, 'core', 'tests', 'fixtures', "test_image.jpg")
    )

    class Meta:
        model = Image
