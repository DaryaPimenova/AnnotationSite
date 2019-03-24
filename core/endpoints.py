from django.conf.urls import include, url
from rest_framework import routers

from .api import RegistrationAPI, LoginAPI, UserAPI, ImageAPI

router = routers.DefaultRouter()

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^annotations/load_image/$", ImageAPI.as_view())
]
