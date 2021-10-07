import string
from django.db.models.query import QuerySet
from django.http import response
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.fields import NullBooleanField

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
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                self.request.session['code'] = room.code
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
 

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url = "code"
    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url)
        session = self.request.session
        if not session.exists(session.session_key):
            session.create()
        if code != None: 
            room  = Room.objects.filter(code=code)
            if room.count()> 0: 
                room = room[0]
                data = RoomSerializer(room).data
                data['is_host'] = self.request.session.session_key == room.host
                self.request.session['code'] = room.code
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code was Invalid'}, status=status.HTTP_404_NOT_FOUND)

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            return JsonResponse(data=None, status=status.HTTP_204_NO_CONTENT)
        code = self.request.session.get('code')
        if code:
            return JsonResponse({'code': code}, status=status.HTTP_200_OK)
        return JsonResponse({'code': False}, status=status.HTTP_200_OK)

            

class LeaveRoom(APIView): 
    def post(self,request,format=None):
        if 'code' in self.request.session:
            self.request.session.pop('code')
            queryset = Room.objects.filter(host=self.request.session.session_key)
            if len(queryset) > 0:
                queryset[0].delete()
            return Response(data={'Message': 'Room Left'}, status=status.HTTP_200_OK)
        return Response(data={'WUT': 'How did you manage to get this error'}, status=status.HTTP_200_OK)




        