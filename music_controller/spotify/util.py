from datetime import timedelta

from requests.api import post

from music_controller.spotify.credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyToken
from django.utils import timezone

def get_user_token(session_id):
    user = SpotifyToken.object.filter(user-session_id)
    if user.exists():
        return user[0]
    else:
        return None


def crud_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_token(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)  # time till expiry
    if tokens:
        tokens.token_type = token_type
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.save(update_fields=[
                    "token_type", "access_token", "refresh_token", "expires_in"])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              token_type=token_type, expires_in=expires_in)
        tokens.save()


def check_auth(session_id):
  tokens = get_user_token(session_id)
  if tokens:
    date = tokens.expires_in 
    if date <= timezone.now():
      refresh(session_id)
      return True
  return False


def refresh(session_id):
  tokens = get_user_token(session_id)
  refresh_token = tokens.refresh_token
  response = post('https://accounts.spotify.com/api/token', data={
    'grant_type': 'refresh_token',
    "refresh_token": refresh_token,
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
  }).json()

  access_token = response.get('access_token')
  token_type= response.get('token_type')
  expires_in= response.get('expires_in')
  refresh_token= response.get('refresh_token')

  crud_tokens(
    session_id, access_token, token_type, expires_in, refresh_token
  )
