from django.conf.urls import include, url
from rest_framework import routers

from . import api

router = routers.DefaultRouter()

urlpatterns = [
    url("^", include(router.urls)),
    url("^styles/$", api.StyleApi.as_view()),
    url("^techniques/$", api.TechniqueApi.as_view()),
    url("^annotations/load_image/$", api.ImageAPI.as_view()),
    url("^annotations/delete_image/$", api.ImageDeleteAPI.as_view()),
    url("^annotations/save/$", api.DetectionSaveAPI.as_view()),
    url("^annotations/image/save/$", api.ClassificationAPI.as_view()),
    url("^detections/download/$", api.DetectionsDownloadAPI.as_view()),
    url("^classifications/download/$", api.ClassificationsDownloadAPI.as_view()),
    url("^get_statistics/$", api.StatisticsAPI.as_view()),
    url("^get_images_gallery/$", api.ImagesGalleryAPI.as_view()),
    url("^bulk_delete_images/$", api.BulkDeleteImagesAPI.as_view()),
]
