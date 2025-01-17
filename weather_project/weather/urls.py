from django.urls import path
from . import views

app_name = 'weather'

urlpatterns = [
    path('', views.get_weather, name='get_weather'),
]