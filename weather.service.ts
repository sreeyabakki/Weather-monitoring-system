import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // OpenWeatherMap URL
  private apiKey = 'b307050cd86a8b73533f1ce8e63446d7'; // Insert your actual API key here
  private backendUrl = 'http://localhost:3000/api/weather'; // Backend API for storing summaries

  constructor(private http: HttpClient) {}

  // Fetch weather data from OpenWeatherMap
  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  // Start fetching weather data every 5 minutes
  startFetchingWeather(city: string): void {
    setInterval(() => {
      this.getWeather(city).subscribe((data) => {
        const tempInCelsius = this.convertKelvinToCelsius(data.main.temp);
        const maxTemp = this.convertKelvinToCelsius(data.main.temp_max);
        const minTemp = this.convertKelvinToCelsius(data.main.temp_min);
        const weatherCondition = data.weather[0].description;

        const date = new Date().toISOString().split('T')[0];

        // Storing daily summary
        const summary = {
          city,
          date,
          avgTemp: tempInCelsius,
          maxTemp,
          minTemp,
          dominantCondition: weatherCondition
        };

        this.storeWeatherSummary(summary);
      }, (error) => {
        console.error(`Error fetching weather data for ${city}:`, error);
      });
    }, 300000); // Polling every 5 minutes
  }

  // Convert temperature from Kelvin to Celsius
  convertKelvinToCelsius(tempInKelvin: number): number {
    return tempInKelvin - 273.15;
  }

  // Store weather summary in the backend (MongoDB)
  storeWeatherSummary(summary: any) {
    this.http.post(this.backendUrl, summary).subscribe(
      (response) => {
        console.log('Weather summary stored successfully:', response);
      },
      (error) => {
        console.error('Failed to store weather summary:', error);
      }
    );
  }

  // Fetch daily summaries from the backend
  getDailySummaries(): Observable<any> {
    return this.http.get(this.backendUrl);
  }
}
