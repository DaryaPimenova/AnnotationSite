from django.conf.urls import include, url
from rest_framework import routers

from .api import ImageAPI, ImageDeleteAPI, DetectionSaveAPI, DownloadAPI, ClassificationAPI, StatisticsAPI, StyleApi

router = routers.DefaultRouter()

urlpatterns = [
    url("^", include(router.urls)),
    url("^styles/$", StyleApi.as_view()),
    url("^annotations/load_image/$", ImageAPI.as_view()),
    url("^annotations/delete_image/$", ImageDeleteAPI.as_view()),
    url("^annotations/save/$", DetectionSaveAPI.as_view()),
    url("^annotations/image/save/$", ClassificationAPI.as_view()),
    url("^annotations/download/$", DownloadAPI.as_view()),
    url("^get_statistics/$", StatisticsAPI.as_view())
]
