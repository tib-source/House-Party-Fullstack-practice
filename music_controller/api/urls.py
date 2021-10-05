from django.urls import path
from .views import CreateRoomView, GetRoom, home, RoomView

urlpatterns = [
    path("", home),
    path("room/", RoomView.as_view()),
    path("create-room/", CreateRoomView.as_view()),
    path("get-room/", GetRoom.as_view())
]
