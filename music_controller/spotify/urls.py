from django.urls import path

from .views import AuthURL, Authenticated, spotify_callback

urlpatterns = [
    path('get-auth-url/', AuthURL.as_view()),
    path('redirect/', spotify_callback ),
    path('is-auth/', Authenticated.as_view()),
]
