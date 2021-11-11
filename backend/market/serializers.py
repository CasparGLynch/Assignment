from django.core.exceptions import TooManyFieldsSent
from rest_framework import serializers
from .models import Product, Order, ProductOrder


""" 
WRITE:
override create and update of ProductOrderSerializer
"""



class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock')

    """
    price and stock validation to check if price is not negative
    """
    def validate_price(self, value):
        if value < 0.0:
            raise serializers.ValidationError('Price cannot be negative')
        return value

    def validate_stock(self, value):
        if value < 1: 
            raise serializers.ValidationError('Stock has to be greater than 0')
        return value


class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = ('id', 'name', 'stock', 'order', 'product')

    """
    Overriding the validate number function of ModelSerializer in order to:
    -check if it < 1 as that is not a valid product order
    -decrement the stock of the chosen 'product' by the 'number' specified 
    returns the value of 'number' if it is valid
    """
    def validate_number(self, value):
        if value < 1:
             raise serializers.ValidationError('Number has to be at least 1')  # using .Validation error to raise error if 'number' less than 1

        
        return value

    def validate_product(self, value):
        product = Product.objects.get(name=self.initial_data['name']) # getting the original product instance by querying database, using self.initial_data because the instance has not been validated yet
        Product.objects.filter(name=self.initial_data['name']).update(stock = Product.get_stock(product) - int(self.initial_data['stock'])) # updating the price by decreasing it by the amount in the product order
        
        

        return value

    

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'date', 'email', 'address')

    

    
        
        
        
            
            
        