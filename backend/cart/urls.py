from django.urls import path
from .views import (
    CartView, AddToCartView, RemoveFromCartView,
    CheckoutView, OrderListView, MarkOrderPaidView
)

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', AddToCartView.as_view(), name='cart-add'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='cart-remove'),
    path('cart/checkout/', CheckoutView.as_view(), name='cart-checkout'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:order_id>/mark-paid/', MarkOrderPaidView.as_view(), name='order-mark-paid'),
]