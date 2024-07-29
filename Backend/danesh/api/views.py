from django.shortcuts import render

from rest_framework import generics, permissions, authentication
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "pk"

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "pk"

class CategotyProducts(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def get(request, *args, **kwargs):
        products = Product.objects.filter(category_id=kwargs['pk'])
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class CategotyProductsCount(APIView):
    def get(request, *args, **kwargs):
        categories = Category.objects.all()
        data = {
            "all": Product.objects.count(),
            "categories": []
        }

        for category in categories:
            category_info = {
                "id": category.id,
                "name": category.name,
                "color": category.color,
                "count": Product.objects.filter(category_id=category.id).count()
            }
            data["categories"].append(category_info)

        return Response(data)
    
class ProductsSearch(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, format=None):
        categoty_id = request.query_params.get("category_id", "")
        search_keyword = request.query_params.get("keyword", "")

        if search_keyword and categoty_id:
            products = Product.objects.filter(category_id=categoty_id).filter(name__icontains=search_keyword)
        elif search_keyword:
            products = Product.objects.filter(name__icontains=search_keyword)
        else:
            products = Product.objects.all()

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
