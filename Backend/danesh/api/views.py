from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Category, Product, Info, Note
from .serializers import CategorySerializer, ProductSerializer, InfoSerializer, NoteSerializer

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "pk"

class InfoListCreate(generics.ListCreateAPIView):
    queryset = Info.objects.all()
    serializer_class = InfoSerializer

class InfoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Info.objects.all()
    serializer_class = InfoSerializer
    lookup_field = "pk"

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
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
        products = Product.objects.all()
        category_products = []
        for product in products:
            categories = product.categories.all()
            for category in categories:
                if(category.id == kwargs['pk']):
                    category_products.append(product)

        serializer = ProductSerializer(category_products, many=True)
        return Response(serializer.data)

class CategotyProductsCount(APIView):
    def get(request, *args, **kwargs):
        categories = Category.objects.all()
        data = {
            "all": Product.objects.count(),
            "categories": []
        }

        products = Product.objects.all()

        for category in categories:
            count = 0
            for product in products:
                productCategories = product.categories.all()
                for productCategory in productCategories:
                    if(productCategory.id == category.id): 
                        count += 1
                        break

            category_info = {
                "id": category.id,
                "name": category.name,
                "icon": category.icon,
                "count": count,
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

class NewestProducts(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(request, *args, **kwargs):
        products = Product.objects.all().order_by('-published_date')
        newest_products = []
        for i in range(5):
            newest_products.append(products[i])

        serializer = ProductSerializer(newest_products, many=True)
        return Response(serializer.data)
    
class DiscountProducts(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, format=None):
        products = Product.objects.all()
        newest_products = []

        limit = request.query_params.get("limit", "")
        count = 0

        for product in products:
            if(limit and count == int(limit)): 
                break

            if(product.discount != 0):
                newest_products.append(product)
                count += 1

        serializer = ProductSerializer(newest_products, many=True)
        return Response(serializer.data)
    
class SuggestedProducts(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, format=None):
        suggested_products = []

        product_ids = []
        count = 0

        while(True):
            random_product = Product.objects.order_by('?')[0]

            if(random_product.id in product_ids):
                continue

            product_ids.append(random_product.id)
            suggested_products.append(random_product)
            count += 1
            
            if(count == 5):
                break

        serializer = ProductSerializer(suggested_products, many=True)
        return Response(serializer.data)
    

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

@require_GET
@csrf_exempt
def serve_image(request, image_path):
    # Open the image file in binary mode
    with open(f'media/{image_path}', 'rb') as image_file:
        format = image_path.split('.')[1]
        response = HttpResponse(image_file.read(), content_type=f'image/{format}')
        response['Access-Control-Allow-Origin'] = 'https://daneshcomputer.liara.run'
        return response