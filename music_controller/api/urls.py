from django.urls import path
from .views import home, RoomView

urlpatterns = [
    path("", home),
    path("room/", RoomView.as_view())
]