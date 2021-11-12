
from django.db import models
from django.db.models.query_utils import Q
from rest_framework.fields import HiddenField


"""
Product Model:
-name: the name of the product 
-description: a description of the product
-price: a float number that represents the product's price
-stock: an integer that represents how many of the product are available for purchase
"""
class Product(models.Model):
       name = models.CharField(max_length=50)
       description = models.TextField() 
       price = models.FloatField()
       stock = models.IntegerField()


       def get_stock(self):
              return self.stock
       def _str_(self):
           return self.name

"""
overriding save method to update stock
"""

class Order(models.Model):
       date = models.DateTimeField(auto_now=True)
       email = models.CharField(max_length=100)
       address = models.TextField()
       name = models.TextField()


class ProductOrder(models.Model):
       name = models.TextField()
       stock = models.IntegerField()
       product = models.ForeignKey(Product, on_delete=models.CASCADE)
       order = models.ForeignKey(Order, on_delete=models.CASCADE)

       def get_product(self):
              return self.product

       def get_number(self):
              return self.number


       




       

