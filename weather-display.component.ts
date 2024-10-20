import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherAlertService } from '../services/weather-alert.service';
import { DailyWeatherService } from '../services/daily-weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  public weatherData: any; // Weather data for all cities
  public errorMessage: string = ''; // Initialize errorMessage as an empty string
Object: any;

  constructor(
    public dailyWeatherService: DailyWeatherService,
    private weatherService: WeatherService,
    private alertService: WeatherAlertService
  ) {}

  ngOnInit() {
    // Fetch data every 5 minutes
    setInterval(() => {
      this.getWeatherDataForCities();
      this.alertService.triggerAlerts();
    }, 300000);  // 300000 ms = 5 minutes

    // Fetch data on page load
    this.getWeatherDataForCities();
  }

  getWeatherDataForCities() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    cities.forEach(city => {
      this.weatherService.getWeather(city).subscribe(data => {
        console.log(`Weather data for ${city}:`, data);
        this.weatherData[city] = data; // Store data in weatherData object
        this.dailyWeatherService.addDailyWeatherData(data);
      }, error => {
        console.error(`Error fetching weather data for ${city}:`, error);
      });
    });
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(
      data => {
        console.log(`Weather data for ${city}:`, data);
        this.weatherData = data; // Store fetched data
        this.dailyWeatherService.addDailyWeatherData(data);
        this.errorMessage = ''; // Clear error message when data is fetched successfully
      },
      error => {
        this.errorMessage = `Error fetching weather data for ${city}: ${error.message}`;
        console.error(this.errorMessage, error);
      }
    );
  }
}



