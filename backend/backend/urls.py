from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from market import views


"""
Used default django router for mapping incoming requests to the api
Three models are used: 
-Products 'http://localhost:8000/api/products/'
-Orders 'http://localhost:8000/api/orders/'
-ProductOrders 'http://localhost:8000/api/productorders/'
"""
router = routers.DefaultRouter()
router.register(r'products', views.ProductView, 'product')
router.register(r'orders', views.OrderView, 'order')
router.register(r'productorders', views.ProductOrderView, 'productorder')

urlpatterns = [
    path('api/', include(router.urls))
]

