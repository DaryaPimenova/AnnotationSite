from django.conf.urls import include, url
from rest_framework import routers

from .api import ImageAPI, AnnotationSaveAPI

router = routers.DefaultRouter()

urlpatterns = [
    url("^", include(router.urls)),
    url("^annotations/load_image/$", ImageAPI.as_view()),
    url("^annotations/save/$", AnnotationSaveAPI.as_view()),
]
