# permissions.py
from rest_framework.permissions import IsAdminUser

class MyCustomPermission(IsAdminUser):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        else:
            return super().has_permission(request, view)