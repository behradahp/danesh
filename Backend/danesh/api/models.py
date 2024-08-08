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
    discount_price = models.IntegerField(default=0)
    price = models.IntegerField()
    main_image = models.ImageField(null=True)
    images = models.ManyToManyField(Image)
    attributes = models.ManyToManyField(Attribute)
    published_date = models.DateTimeField(auto_now_add=True)
    admin_username = models.CharField(max_length=100)
    last_update_date = models.DateTimeField(auto_now=True)
    lats_update_admin_username= models.CharField(max_length=100)

    @property
    def discount(self):
        if self.discount_price == 0:
            return 0
        
        return int(((self.price - self.discount_price) / self.price) * 100)
    
    def delete(self, *args, **kwargs):
        # Delete related Image objects and their files
        for image in self.images.all():
            image.image.delete()
            image.delete()
        
        if self.main_image:
            self.main_image.delete()

        super().delete(*args, **kwargs)
    
class Info(models.Model):
    about = models.TextField(blank=True)
    email = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)

class Note(models.Model):
    text = models.TextField(blank=True)


