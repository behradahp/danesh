from django.urls import path
from . import views
urlpatterns = [
    path("add/", views.add_admin),
    path("login/", views.admin_login),
    path("edit/<int:admin_id>", views.edit_admin),
]