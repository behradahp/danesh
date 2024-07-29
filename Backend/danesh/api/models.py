from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)

class Image(models.Model):
    image = models.TextField()

class Product(models.Model):
    category_id = models.IntegerField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    discount = models.FloatField(default=0)
    price = models.IntegerField()
    main_image = models.TextField()
    images = models.ManyToManyField(Image)

    @property
    def discount_price(self):
        return self.price - (self.price * (self.discount / 100))
    

