from rest_framework import serializers
from .models import Category, Product, Image

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "color"]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ["id", "category_id", "name", "description", "discount", "price", "discount_price", "main_image", "images"]

    def create(self, validated_data):
        images_data = self.context['request'].POST.getlist('images')
        product = Product.objects.create(**validated_data)
        for image_data in images_data:
            image = Image.objects.create(product=product, image=image_data)
            product.images.add(image)
        return product