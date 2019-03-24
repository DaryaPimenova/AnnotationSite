from django.conf.urls import include, url
from rest_framework import routers

from .api import RegistrationAPI, LoginAPI, UserAPI, ImageApi, AnnotationsApi

router = routers.DefaultRouter()
router.register("load_image", ImageApi, 'load_image')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^annotations/save/$", AnnotationsApi.as_view()),
]
