from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100, null=True)

class Image(models.Model):
    image = models.ImageField(null=True)

class Attribute(models.Model):
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)

class Product(models.Model):
    category_id = models.IntegerField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    discount = models.FloatField(default=0)
    price = models.IntegerField()
    main_image = models.ImageField(null=True)
    images = models.ManyToManyField(Image)
    attributes = models.ManyToManyField(Attribute)
    published_date = models.DateTimeField(auto_now_add=True)
    admin_username = models.CharField(max_length=100)
    last_update_date = models.DateTimeField(auto_now=True)
    lats_update_admin_username= models.CharField(max_length=100)

    @property
    def discount_price(self):
        return self.price - (self.price * (self.discount / 100))
    

