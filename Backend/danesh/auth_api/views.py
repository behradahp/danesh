from django.shortcuts import render

from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Profile
from .serializer import AdminLoginSeializer, MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, ProfileUpdateSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class AdminLoginView(TokenObtainPairView):
    serializer_class = AdminLoginSeializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

@api_view(['GET', 'PATCH'])
def update_profile(request, pk):
    user = User.objects.get(id=pk)
    profile = Profile.objects.get(user=user)
    serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        if request.method == "PATCH" and request.data["image_delete"] == "1":
            profile.image = "user-default.png"
            profile.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
def panel(request):
    if request.method == "GET":
        message = f"Hey {request.user}, You are seeing a Get response"
        return Response({"message": message}, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        text = request.POST.get("text")
        message = f"Hey {request.user}, Your text is {text}"
        return Response({"message": message}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)