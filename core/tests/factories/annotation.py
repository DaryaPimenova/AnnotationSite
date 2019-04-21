import factory.fuzzy
from core.models import Annotation


class AnnotationFactory(factory.DjangoModelFactory):
    
    class Meta:
        model = Annotation
