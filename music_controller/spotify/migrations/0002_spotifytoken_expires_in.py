# Generated by Django 3.2.7 on 2021-10-15 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='expires_in',
            field=models.DateTimeField(default=1),
            preserve_default=False,
        ),
    ]