from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    verbose_name = 'Ядро'

    def ready(self):
        import core.receivers
