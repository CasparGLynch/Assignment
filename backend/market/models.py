from django.db import models # Used the django models class for my models

# NOTE: ID is implemented in the Model class 
#
#

"""
Product Model: Represents the Prodcts that are displayed and selectable on the frontend
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
Order Model: A model that represents orders that are requested on the frontend
-date: Date and time when order instance was created
-email: Used a charField to represent the user's email
-address: Address of the user that ordered
-name: First and Last name of the user that ordered
"""
class Order(models.Model):
       date = models.DateTimeField(auto_now=True)
       email = models.CharField(max_length=100)
       address = models.TextField()
       name = models.TextField()

"""
Product Order: A Table that is used to link Products and Orders (Complex Orders)
-name: Name of the product in the Order
-stock: number of products selected for the Order
-product: id of the product in the Order, uses Foreign Key
-order: id of the order that contains the ProductOrder
"""
class ProductOrder(models.Model):
       name = models.TextField()
       stock = models.IntegerField()
       product = models.ForeignKey(Product, on_delete=models.CASCADE)
       order = models.ForeignKey(Order, on_delete=models.CASCADE)

       def get_product(self):
              return self.product

       def get_number(self):
              return self.number


       




       

