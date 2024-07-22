from django.db import models

# Create your models here.
class User(models.Model):
    firstname = models.CharField(max_length=20, null=True, blank=True)
    lastname = models.CharField(max_length=20, null=True, blank=True)
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=20, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=100)
    is_admin = models.BooleanField()