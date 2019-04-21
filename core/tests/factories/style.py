import factory.fuzzy
from core.models import Style


class StyleFactory(factory.DjangoModelFactory):
    
    class Meta:
        model = Style
