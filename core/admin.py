from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from core.models import Image, Annotation


admin.site.register(Image)
admin.site.register(Annotation)
