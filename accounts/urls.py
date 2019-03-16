from django.urls import path
from accounts.views import login


urlpatterns = [
    path(r'login', login, name='login'),
]
