from datetime import timedelta
from http.client import ResponseNotReady

from requests import post, put, get

from .credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyToken
from django.utils import timezone


BASE_URL = 'https://api.spotify.com/v1/me/'


def get_user_token(session_id):
    user = SpotifyToken.objects.filter(user=session_id)
    if user.exists():
        return user[0]
    else:
        return None


def crud_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_token(session_id)
    print(expires_in, 'THIS IS EXPIRY TIME')
    expires_in = timezone.now() + timedelta(seconds=expires_in)  # time till expiry
    if tokens:
        tokens.token_type = token_type
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.save(update_fields=[
                    "token_type", "access_token", "refresh_token", "expires_in"])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token,
                              token_type=token_type, expires_in=expires_in)
        tokens.save()


def check_auth(session_id):
  tokens = get_user_token(session_id)
  if tokens:
    date = tokens.expires_in 
    if date <= timezone.now():
      refresh(session_id)
      return True
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



def spotify_request(session_id, endpoint, post_=False, put_=False):
  tokens = get_user_token(session_id)
  header = {'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + tokens.access_token}
  if post_:
    post(BASE_URL + endpoint, headers=header)
  if put_:
    put(BASE_URL + endpoint, headers=header)
  
  response = get(BASE_URL + endpoint, {}, headers=header)
  try: 
    return response.json()
  except: 
    return {'Error': 'Issue with request'}