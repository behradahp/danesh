from django.urls import path


from . import views

urlpatterns = [
    path("categories/", views.CategoryListCreate.as_view(), name="category-view-create"),
    path("categories/<int:pk>/", views.CategoryRetrieveUpdateDestroy.as_view(), name="categories-update"),
    path("products/", views.ProductListCreate.as_view(), name="product-view-create"),
    path("products/<int:pk>/", views.ProductRetrieveUpdateDestroy.as_view(), name="product-update"),
    path("products/category/<int:pk>/", views.CategotyProducts.as_view(), name="product-category"),
    path("products/category/count/", views.CategotyProductsCount.as_view(), name="product-count"),
    path("products/search", views.ProductsSearch.as_view(), name="product-search"),
]