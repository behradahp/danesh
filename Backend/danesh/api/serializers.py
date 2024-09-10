import json
from rest_framework import serializers
from .models import Category, Product, Image, Attribute, Info, Note, Color, DefaultAttribute

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "icon", "image"]

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = ["id", "about", "email", "phone", "address"]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "text"]

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image']

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['id', 'key', 'value']

class DefaultAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultAttribute
        fields = ['id', 'key', 'value']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'hex']

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, required=False)
    attributes = AttributeSerializer(many=True, required=False)
    default_attributes = DefaultAttributeSerializer(many=True, required=False)
    categories = CategorySerializer(many=True, required=False)
    colors = ColorSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ["id", "categories", "name","slug", "description", "discount", "price", "discount_price", "main_image", "images", "attributes", "default_attributes", "brand", "stock","colors", "published_date", "admin_username", "last_update_date", "lats_update_admin_username"]

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        attributes_json_data = self.context['request'].data.get('attributes')
        default_attributes_json_data = self.context['request'].data.get('default_attributes')
        categories_json_data = self.context['request'].data.get('categories')
        colors_json_data = self.context['request'].data.get('colors')

        product = Product.objects.create(**validated_data)

        for image_data in images_data:
            image = Image.objects.create(product=product, image=image_data)
            product.images.add(image)

        try:
            attributes_data = json.loads(attributes_json_data)
        
            for attribute_data in attributes_data:
                attribute = Attribute.objects.create(product=product, key=attribute_data['key'], value=attribute_data['value'])
                product.attributes.add(attribute)
        except:
            product.attributes.clear()

        try:
            default_attributes_data = json.loads(default_attributes_json_data)
        
            for default_attribute_data in default_attributes_data:
                default_attribute = DefaultAttribute.objects.create(product=product, key=default_attribute_data['key'], value=default_attribute_data['value'])
                product.default_attributes.add(default_attribute)
        except:
            product.default_attributes.clear()

        try:
            categories_data = json.loads(categories_json_data)
        
            for category_data in categories_data:
                category = Category.objects.filter(id=category_data["id"])
                product.categories.add(category[0])
        except:
            product.categories.clear()

        try:
            colors_data = json.loads(colors_json_data)
        
            for color_data in colors_data:
                color = Color.objects.create(product=product, hex=color_data['hex'], name=color_data['name'])
                product.colors.add(color)
        except:
            product.colors.clear()
            
        return product
    
    def update(self, instance, valid_data):
        instance.name = valid_data['name']
        instance.description = valid_data['description']
        instance.discount_price = valid_data['discount_price']
        instance.price = valid_data['price']
        instance.brand = valid_data['brand']
        instance.stock = valid_data['stock']
        instance.admin_username = valid_data['admin_username']
        instance.lats_update_admin_username = valid_data['lats_update_admin_username']
        if 'main_image' in valid_data:
            instance.main_image = valid_data['main_image']

        instance.images.clear()
        images_data = self.context['request'].FILES.getlist('images')
        for image_data in images_data:
            image = Image.objects.create(product=instance, image=image_data)
            instance.images.add(image)

        attributes_json_data = self.context['request'].data.get('attributes')
        default_attributes_json_data = self.context['request'].data.get('default_attributes')
        categories_json_data = self.context['request'].data.get('categories')
        colors_json_data = self.context['request'].data.get('colors')

        try:
            instance.attributes.clear()
            attributes_data = json.loads(attributes_json_data)
            for attribute_data in attributes_data:
                attribute = Attribute.objects.create(product=instance, key=attribute_data['key'], value=attribute_data['value'])
                instance.attributes.add(attribute)
        except:
            instance.attributes.clear()

        try:
            instance.default_attributes.clear()
            default_attributes_data = json.loads(default_attributes_json_data)
            for default_attribute_data in default_attributes_data:
                default_attribute = DefaultAttribute.objects.create(product=instance, key=default_attribute_data['key'], value=default_attribute_data['value'])
                instance.default_attributes.add(default_attribute)
        except:
            instance.default_attributes.clear()

        try:
            instance.categories.clear()
            categories_data = json.loads(categories_json_data)
            for category_data in categories_data:
                category = Category.objects.filter(id=category_data["id"])
                instance.categories.add(category[0])
            
        except:
            instance.categories.clear()

        try:
            colors_data = json.loads(colors_json_data)
            for color_data in colors_data:
                color = Color.objects.create(product=instance, hex=color_data['hex'], name=color_data['name'])
                instance.colors.add(color)
        except:
            instance.colors.clear()

        instance.save()

        return instance


