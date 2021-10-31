from django.contrib import admin
from django.contrib.admin.helpers import InlineFieldset
from .models import Product, Order

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'stock')



class OrderAdmin(admin.ModelAdmin):
    list_display = ('date_time', 'name_of_customer', 'shipping_info')
    InlineFieldset = ('products')
# Register your models here.

admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
