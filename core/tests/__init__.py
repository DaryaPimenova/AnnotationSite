from django.test import TestCase
from rest_framework.test import APIClient


class SesameTestCase(TestCase):

    def setUp(self) -> None:
        self.api_client = APIClient()
