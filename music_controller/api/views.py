from django.http.response import HttpResponse
from django.shortcuts import render
from rest_framework import generics

from .models import Room
from .serializers import RoomSerializer

def home(request):
    return HttpResponse("Hello")


class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
