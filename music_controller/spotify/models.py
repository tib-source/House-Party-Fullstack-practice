from django.db import models
from datetime import timezone

from api.models import Room

class SpotifyToken(models.Model):
  user = models.CharField(max_length=50, unique=True)
  created_at = models.DateField(auto_now_add=True)
  refresh_token = models.CharField(max_length=150)
  access_token = models.CharField(max_length=150)
  token_type = models.CharField(max_length=150)
  expires_in = models.DateTimeField(blank=True)
  error = models.CharField(max_length=150)


class Votes(models.Model): 
  user = models.CharField(max_length=50, unique=True)
  created_at = models.DateField(auto_now_add=True)
  song_id = models.CharField(max_length=50)
  room = models.ForeignKey(Room, on_delete=models.CASCADE)