from django.urls import path
from accounts.views import login, signup


urlpatterns = [
    path(r'login', login, name='login'),
    path(r'signup', signup, name='signup'),
]
