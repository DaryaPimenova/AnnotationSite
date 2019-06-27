import factory.fuzzy
from dateutil.relativedelta import relativedelta
from django.utils import timezone
from django.contrib.auth import get_user_model


class UserFactory(factory.DjangoModelFactory):
    email = factory.Sequence(lambda x: f"login{x}@mail.ru")
    password = factory.PostGenerationMethodCall('set_password', 'test')
    date_joined = factory.fuzzy.FuzzyDateTime(start_dt=timezone.now() - relativedelta(days=128), end_dt=timezone.now())
    last_login = factory.fuzzy.FuzzyDateTime(start_dt=timezone.now() - relativedelta(days=128), end_dt=timezone.now())

    is_staff = False
    is_active = True
    is_superuser = False

    class Meta:
        model = get_user_model()
