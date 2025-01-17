from django.shortcuts import render
from django.conf import settings
from django.contrib import messages
import requests

def get_weather(request):
    # Clear any existing session data when page loads
    if request.method == 'GET':
        request.session.pop('weather_data', None)
        return render(request, 'weather/weather.html')
    
    if request.method == 'POST':
        city = request.POST.get('city')
        
        try:
            # OpenWeatherMap API endpoint
            url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={settings.OPENWEATHERMAP_API_KEY}&units=metric'
            
            response = requests.get(url)
            response.raise_for_status()  # Raises an HTTPError for bad responses
            weather_data = response.json()
            
            context = {
                'city': weather_data['name'],
                'temperature': round(weather_data['main']['temp']),
                'description': weather_data['weather'][0]['description'],
                'icon': weather_data['weather'][0]['icon'],
                'humidity': weather_data['main']['humidity'],
                'wind_speed': weather_data['wind']['speed'],
            }
            
            return render(request, 'weather/weather.html', context)
            
        except requests.exceptions.RequestException:  # This is the correct way to catch requests exceptions
            messages.error(request, 'Error fetching weather data. Please try again.')
        except KeyError:
            messages.error(request, 'City not found. Please try another city.')
    
    return render(request, 'weather/weather.html')

