from django.urls import path
from annotate_site.views import IndexView


urlpatterns = [
    path(r'$', IndexView.as_view(), name='index'),
]
