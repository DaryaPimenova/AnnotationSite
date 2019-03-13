from django.urls import path
from core.views import IndexView


urlpatterns = [
    path(r'', IndexView.as_view(), name='index'),
]
