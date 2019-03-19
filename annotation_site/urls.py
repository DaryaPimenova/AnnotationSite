from django.contrib import admin
from django.conf.urls import url, include
from django.views.generic import TemplateView
from core import endpoints


urlpatterns = [
    url('admin/', admin.site.urls),
    url(r'^api/', include(endpoints)),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
