from http.client import error
from django.shortcuts import redirect, render
from .credentials import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response 
from requests import Request, post
from .util import *
from api.models import Room
class AuthURL(APIView):
  def get(self, request, format=None):
    scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
      'scope': scopes,
      'response_type': 'code',
      'redirect_uri': REDIRECT_URI,
      'client_id': CLIENT_ID,
    }).prepare().url

    return Response({'url': url}, status=status.HTTP_200_OK )



def spotify_callback( request):
  code = request.GET.get('code')
  error = request.GET.get('error')

  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type': 'authorization_code', 
    'code': code,
    'redirect_uri': REDIRECT_URI,
    "client_id" : CLIENT_ID,
    "client_secret": CLIENT_SECRET
  }).json()

  access_token= response.get('access_token')
  token_type = response.get('token_type')
  refresh_token = response.get('refresh_token')
  expires_in = response.get('expires_in')
  error = response.get('error')

  if not request.session.exists(request.session.session_key):
    request.session.create()
  crud_tokens(
    request.session.session_key, access_token, token_type, expires_in, refresh_token
  )

  return redirect('frontend:')



class Authenticated(APIView):
  def get(self, request): 
    is_auth = check_auth(self.request.session.session_key)
    return Response({'status': is_auth}, status=status.HTTP_200_OK)



class CurrentSong(APIView):
  def get(self,request):
    code = self.request.session.get('code')
    room = Room.objects.filter(code=code)
    if room.exists():
      room = room[0]
    else:
      return Response({'Bad Request': 'No Room Found'}, status=status.HTTP_404_NOT_FOUND)
    host = room.host
    endpoint = 'player/currently-playing'
    response = spotify_request(host, endpoint)
    print(response)

    return Response({'response': response}, status=status.HTTP_200_OK)
