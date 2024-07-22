from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.models import Product

# Create your views here.
@api_view(["Get"])
def get_all_products(request):
    data = {}
    count = Product.objects.count()
    data['data'] = count
    products = []
    for index in range(count):
        products.append({
            "id": Product.objects.all()[index].id,
            "title": Product.objects.all()[index].title,
            "decription": Product.objects.all()[index].decription, 
            "views": Product.objects.all()[index].views,
        })
    data['products'] = products
    return Response(data)

@api_view(["Get"])
def add_product(request):
    count = Product.objects.count()
    count = count + 1
    Product.objects.create(title=f"Product {count}", decription="this is a product")
    return Response({"message": "success"})

@api_view(["Get"])
def delete_products(request):
    Product.objects.all().delete()
    return Response({"message": "success"})
