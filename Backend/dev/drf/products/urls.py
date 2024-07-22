from django.urls import path
from . import views
urlpatterns = [
    path('', views.get_all_products),
    path('add/', views.add_product),
    path('delete/', views.delete_products),
]