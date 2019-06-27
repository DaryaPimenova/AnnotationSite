import factory.fuzzy
from core.models import Detection
from core.tests.factories import ImageFactory, UserFactory, ImageClassFactory


class DetectionFactory(factory.DjangoModelFactory):
    x2 = factory.fuzzy.FuzzyInteger(1, 2048)
    y2 = factory.fuzzy.FuzzyInteger(1, 2048)
    x1 = factory.LazyAttribute(lambda o: Decimal(o.x2 / 2))
    y1 = factory.LazyAttribute(lambda o: Decimal(o.y2 / 2))

    image = factory.SubFactory(ImageFactory)
    user = factory.SubFactory(UserFactory)
    image_class = factory.SubFactory(ImageClassFactory)

    class Meta:
        model = Detection
