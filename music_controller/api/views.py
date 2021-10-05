import string
from django.db.models.query import QuerySet
from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import generics, serializers

from .models import Room
from .serializers import CreateRoomSerializer, RoomSerializer
from rest_framework import status
from rest_framework .views import APIView
from rest_framework.response import Response


def home(request):
    return HttpResponse("Hello")


class RoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            print([guest_can_pause, votes_to_skip], "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOF")
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
