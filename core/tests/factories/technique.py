import factory.fuzzy
from core.models import Technique


class TechniqueFactory(factory.DjangoModelFactory):
    title = factory.Sequence(lambda x: f"Technique-{x}")

    class Meta:
        model = Technique
