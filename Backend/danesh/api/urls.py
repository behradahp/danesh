from django.urls import path


from . import views

urlpatterns = [
    path("categories/", views.CategoryListCreate.as_view(), name="category-view-create"),
    path("categories/<int:pk>/", views.CategoryRetrieveUpdateDestroy.as_view(), name="categories-update"),
    path("about/", views.InfoListCreate.as_view(), name="Info-view-create"),
    path("about/<int:pk>/", views.InfoRetrieveUpdateDestroy.as_view(), name="info-update"),
    path("note/", views.NoteListCreate.as_view(), name="Note-view-create"),
    path("note/<int:pk>/", views.NoteRetrieveUpdateDestroy.as_view(), name="Note-update"),
    path("products/", views.ProductListCreate.as_view(), name="product-view-create"),
    path("products/<int:pk>/", views.ProductRetrieveUpdateDestroy.as_view(), name="product-update"),
    path("products/category/<int:pk>/", views.CategotyProducts.as_view(), name="product-category"),
    path("products/category/count/", views.CategotyProductsCount.as_view(), name="product-count"),
    path("products/discount", views.DiscountProducts.as_view(), name="discount-products"),
    path("products/search", views.ProductsSearch.as_view(), name="product-search"),
    path("products/newest/", views.NewestProducts.as_view(), name="newest-products"),
    path("products/suggested/", views.SuggestedProducts.as_view(), name="suggested-products"),
    path('image/<str:image_path>', views.serve_image, name='serve_image'),
]