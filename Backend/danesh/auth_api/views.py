from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Profile
from .serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def panel(request):
    if request.method == "GET":
        message = f"Hey {request.user}, You are seeing a Get response"
        return Response({"message": message}, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        text = request.POST.get("text")
        message = f"Hey {request.user}, Your text is {text}"
        return Response({"message": message}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)