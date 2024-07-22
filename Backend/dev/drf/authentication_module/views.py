from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User

# Create your views here.
@api_view(["Post"])
def add_admin(request, *args, **kwargs):
    data = request.data
    User.objects.create(firstname = data["firstname"], lastname = data["lastname"], username = data["username"], email = data["email"], phone = data["phone"], password = data["password"], is_admin = data["is_admin"])
    return Response(data)

@api_view(["Post"])
def admin_login(request, *args, **kwargs):
    username = request.data['username']
    password = request.data['password']

    admin = User.objects.filter(username = username).filter(password = password).filter(is_admin = True)

    if admin:
        admin_data = {
            "firstname": admin.get().firstname,
            "lastname": admin.get().lastname,
            "username": admin.get().username,
            "email": admin.get().email,
            "phone": admin.get().phone,
        }
        return Response({"data": admin_data, "error": [], "message": "successfully logged in"})
    
    return Response({"data": {}, "error": [{"message": "username or password in incorrect. or user is not admin"}], "message": "login failed"})

@api_view(["Post"])
def edit_admin(request, admin_id):
    data = request.data
    admin = User.objects.get(id = admin_id)
    admin.firstname = data["firstname"]
    admin.lastname = data["lastname"]
    admin.username = data["username"]
    admin.email = data["email"]
    admin.phone = data["phone"]
    admin.password = data["password"]
    admin.is_admin = data["is_admin"]
    admin.save()
    return Response(data)
    