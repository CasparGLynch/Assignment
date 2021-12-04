from django.core.exceptions import PermissionDenied
from rest_framework import viewsets
from .serializers import ProductOrderSerializer, ProductSerializer, OrderSerializer
from .models import Product, Order, ProductOrder
"""
NOTE: The models i created in the API use the class ViewSet has implementaions for .list(), .retrieve(), .create(), .update(), .partial_update(), and .destroy()
Most of The checks on whether the model requests are valid are done in the 'serializers.py' file
"""


"""
Product Viewset which defines the serializer and the queryset
"""
class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(stock__gte = 1) # only displays products that are in stock(i.e. stock is greater than 0)

"""
ProductOrder Viewset which defines the according serializer and the queryset
"""
class ProductOrderView(viewsets.ModelViewSet):
    serializer_class = ProductOrderSerializer
    queryset = ProductOrder.objects.all()

    """
    Override of create function of product. The purpose is to decrement the stock of the Product in the Database by the amount of the Product in the Order
    Checks if the stock will become negative due to the stock decrease and sending a ValidationError if stock will become < 0
    """
    def create(self, request, *args, **kwargs):
        product = Product.objects.get(id=request.data['product']) # getting the original product instance by querying database, using 'request.data' because the instance has not been validated yet
        if (product.stock - int(request.data['stock']) < 0): # checking wether the decrease will result in a negative stock
            raise PermissionDenied('Invalid purchase')
        else: 
            Product.objects.filter(id=request.data['product']).update(stock = Product.get_stock(product) - int(request.data['stock'])) # updating the price by decreasing it by the amount in the productOrder instance
        
        return super().create(request, *args, **kwargs)
    


"""
Order Viewset which defines the according serializer and the queryset
"""
class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

