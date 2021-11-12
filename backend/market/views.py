from rest_framework import viewsets
from .serializers import ProductOrderSerializer, ProductSerializer, OrderSerializer
from .models import Product, Order, ProductOrder
"""
NOTE: The models in the API use the class ModelViewSet which has default implementaions for .list(), .retrieve(), .create(), .update(), .partial_update(), and .destroy()
"""


"""
Product Viewset which defines the serializer and the queryset
"""
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

"""
ProductOrder Viewset which defines the according serializer and the queryset
"""
class ProductOrderView(viewsets.ModelViewSet):
    serializer_class = ProductOrderSerializer
    queryset = ProductOrder.objects.all()

"""
Order Viewset which defines the according serializer and the queryset
"""
class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

