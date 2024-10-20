import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  weatherData: any = {}; // Object to store weather data for each city
  dailySummaries: any[] = [];
  alertThreshold = 35; // Temperature threshold for alerts
cityName: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    console.log("WeatherComponent initialized"); // Check if this logs

    // Fetch weather data for each city
    this.cities.forEach((city) => {
      this.weatherService.startFetchingWeather(city);
      this.weatherService.getWeather(city).subscribe(data => {
        console.log(`Weather data for ${city}:`, data); // Log weather data
        this.weatherData[city] = data; // Store data for each city
      });
    });

    // Fetch daily summaries
    this.getDailySummaries();
  }

  // Get daily weather summaries from backend
  getDailySummaries() {
    this.weatherService.getDailySummaries().subscribe((summaries: any[]) => {
      this.dailySummaries = summaries;
    });
  }

  // Function to check for temperature alerts
  checkAlert(temp: number): boolean {
    return temp > this.alertThreshold;
  }
}
