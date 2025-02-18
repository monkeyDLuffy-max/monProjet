# ShopEase/ShopEaseApp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('products/', views.product_list, name='product_list'),
    path('products/<int:pk>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('invoices/', views.invoices, name='invoices'),
    path('loyalty/', views.loyalty_program, name='loyalty_program'),
    path('returns/', views.returns, name='returns'),
    path('add-product/', views.add_product, name='add_product'),
]