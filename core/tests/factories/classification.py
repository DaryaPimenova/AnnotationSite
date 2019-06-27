import factory.fuzzy
from core.models import Classification
from core.tests.factories import ImageFactory, UserFactory, ImageClassFactory


class ClassificationFactory(factory.DjangoModelFactory):
    image = factory.SubFactory(ImageFactory)
    user = factory.SubFactory(UserFactory)
    image_class = factory.SubFactory(ImageClassFactory)
    style = factory.SubFactory(StyleFactory)
    technique = factory.SubFactory(TechniqueFactory)

    class Meta:
        model = Classification
