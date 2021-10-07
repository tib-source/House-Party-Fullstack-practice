from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id", "code", "host", "guest_can_pause",
                  "votes_to_skip", "created_on")


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("guest_can_pause", "votes_to_skip")



class UpdateViewSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta: 
        model= Room
        fields= ('guest_can_pause','votes_to_skip','code')