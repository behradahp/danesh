import json
from rest_framework import serializers
from .models import Category, Product, Image, Attribute, Info, Note

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "color"]

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

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, required=False)
    attributes = AttributeSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ["id", "category_id", "name", "description", "discount", "price", "discount_price", "main_image", "images", "attributes", "brand", "published_date", "admin_username", "last_update_date", "lats_update_admin_username"]

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        attributes_json_data = self.context['request'].data.get('attributes')

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
            
        return product
    
    def update(self, instance, valid_data):
        instance.category_id = valid_data['category_id']
        instance.name = valid_data['name']
        instance.description = valid_data['description']
        instance.discount_price = valid_data['discount_price']
        instance.price = valid_data['price']
        instance.brand = valid_data['brand']
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

        try:
            attributes_data = json.loads(attributes_json_data)
            for attribute_data in attributes_data:
                attribute = Attribute.objects.create(product=instance, key=attribute_data['key'], value=attribute_data['value'])
                instance.attributes.add(attribute)
        except:
            instance.attributes.clear()

        instance.save()

        return instance
        # main_image = models.ImageField(null=True)
        # images = models.ManyToManyField(Image, null=True)
        # attributes = models.ManyToManyField(Attribute, null=True)


