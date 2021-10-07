from django.urls import path
from .views import CreateRoomView, GetRoom, LeaveRoom, UpdateRoom, UserInRoom, home, RoomView

urlpatterns = [
    path("", home),
    path("room/", RoomView.as_view()),
    path("create-room/", CreateRoomView.as_view()),
    path("get-room/", GetRoom.as_view()),
    path('user-in-room/', UserInRoom.as_view()),
    path('leave/', LeaveRoom.as_view()), 
    path('update-room/', UpdateRoom.as_view())
]
