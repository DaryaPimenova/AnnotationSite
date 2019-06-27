import factory.fuzzy
from core.models import Style


class StyleFactory(factory.DjangoModelFactory):
    title = factory.Sequence(lambda x: f"Style-{x}")
    
    class Meta:
        model = Style
