from rest_framework import serializers # used ModelSerializer which has default implementaions for create, update, delete and list
from .models import Product, Order, ProductOrder
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as check_email


"""
Serializer for the Product Model: 
Same fields as the Product Model but with ID from Base Model class
"""
class ProductSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock')

    """
    Override of Price validation on creation of a Product instance in the database
    Checks if price is negative and returns a ValidationError if true
    """
    def validate_price(self, value):
        if value < 0.0:
            raise serializers.ValidationError('Price cannot be negative')

        return value


    """
    Override of Stock validation on creation of a Product instance
    Checks if stock is less than 1 and returns a ValidationError if true
    """
    def validate_stock(self, value):
        if value < 1: 
            raise serializers.ValidationError('Stock has to be greater than 0')

        return value



"""
Serializer for ProductOrder Model: 
Same fields as ProductOrder Model but with added ID from base model class
"""
class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = ('id', 'name', 'stock', 'order', 'product')

    """
    Overriding the validate number function of ModelSerializer in order to:
    -check if it < 1 as that is not a valid product order
    """
    def validate_number(self, value):
        if value < 1:
             raise serializers.ValidationError('Number has to be at least 1')  # using .Validation error to raise error if 'number' less than 1

        return value


    """
    Override of validate function of product. The purpose is to decrement the stock of the Product in the Database by the amount of the Product in the Order
    """
    def validate_product(self, value):
        product = Product.objects.get(name=self.initial_data['name']) # getting the original product instance by querying database, using 'self.initial_data' because the instance has not been validated yet
        Product.objects.filter(name=self.initial_data['name']).update(stock = Product.get_stock(product) - int(self.initial_data['stock'])) # updating the price by decreasing it by the amount in the productOrder instance
        return value

    
"""
Serializer for Order Model: 
Same fields as Order Model but with added ID from base model class
"""
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'date', 'email', 'address', 'name')

    """
    Override of validate function of Order. Uses django's validate_email validator to check the email and return a ValidationError if email is invalid
    """
    def validate_email(self, value):
        try:
            check_email(value)
        except ValidationError as error:
            raise serializers.ValidationError('Invalid email')
        else:
            return value

    
        
        
        
            
            
        