from django.db import models
import random
import string

CODE_LENGTH = 6

def generate_room_code():
    alphabet = string.ascii_uppercase
    length = CODE_LENGTH
    while True:
        code = "".join(random.choices(alphabet, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code
    # Create your models here.


class Room(models.Model):
    code = models.CharField(
    max_length=CODE_LENGTH, default=generate_room_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_on = models.DateTimeField(auto_now_add=True)
