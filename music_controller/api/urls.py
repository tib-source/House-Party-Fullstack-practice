from django.urls import path
from .views import CreateRoomView, home, RoomView

urlpatterns = [
    path("", home),
    path("room/", RoomView.as_view()),
    path("create-room/", CreateRoomView.as_view())
]
