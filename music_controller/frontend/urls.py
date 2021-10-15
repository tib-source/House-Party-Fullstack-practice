from django.urls import path
from django.urls.conf import re_path
from .views import index

app_name = 'frontend'

urlpatterns = [
    re_path("", index, name='')
] 