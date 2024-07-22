from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=20)
    decription = models.TextField()
    views = models.IntegerField(default=0)
