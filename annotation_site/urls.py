from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.urls import static, staticfiles_urlpatterns
from django.views.generic import TemplateView

from core import endpoints
from accounts import endpoints as end_acc

urlpatterns = []
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url('admin/', admin.site.urls),
    url(r'^api/', include(endpoints)),
    url(r'^api/', include(end_acc)),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^', TemplateView.as_view(template_name="core/index.html")),
]
