from django.urls import path
from .views import home, RoomView

urlpatterns = [
    path("", home),
    path("api/", RoomView.as_view())
]