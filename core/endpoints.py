from django.conf.urls import include, url
from rest_framework import routers

from .api import ImageAPI, ImageDeleteAPI, AnnotationSaveAPI, DownloadAPI

router = routers.DefaultRouter()

urlpatterns = [
    url("^", include(router.urls)),
    url("^annotations/load_image/$", ImageAPI.as_view()),
    url("^annotations/delete_image/$", ImageDeleteAPI.as_view()),
    url("^annotations/save/$", AnnotationSaveAPI.as_view()),
    url("^annotations/download/$", DownloadAPI.as_view())
]
