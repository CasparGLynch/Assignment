"""
Django admin page for modules (NOT USED)
"""

from django.contrib import admin
from django.contrib.admin.helpers import InlineFieldset
from .models import Product, Order

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'stock')



class OrderAdmin(admin.ModelAdmin):
    list_display = ('date', 'email', 'address', 'name')
    InlineFieldset = ('products')


admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
