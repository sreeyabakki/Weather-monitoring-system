// src/app/services/daily-weather.service.ts
import { Injectable } from '@angular/core';
import { DailyWeatherData } from '../models/daily-weather.model';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DailyWeatherService {
  private dailyWeatherSummaries: DailyWeatherData[] = [];
  private temperatures: number[] = [];

  // Add new weather data to the service
  public addDailyWeatherData(weatherData: any) {
    const date = new Date().toISOString().split('T')[0]; // Get the current date

    let dailySummary = this.dailyWeatherSummaries.find(summary => summary.date === date);
    if (!dailySummary) {
      dailySummary = {
        date,
        averageTemperature: 0,
        maximumTemperature: -Infinity,
        minimumTemperature: Infinity,
        dominantCondition: '',
        weatherConditions: []
      };
      this.dailyWeatherSummaries.push(dailySummary);
    }

    // Update temperatures and calculate real average
    const temp = weatherData.main.temp;
    this.temperatures.push(temp);
    dailySummary.averageTemperature = this.calculateAverageTemperature();
    dailySummary.maximumTemperature = Math.max(dailySummary.maximumTemperature, temp);
    dailySummary.minimumTemperature = Math.min(dailySummary.minimumTemperature, temp);
    dailySummary.weatherConditions.push(weatherData.weather[0].description);
    dailySummary.dominantCondition = this.calculateDominantCondition(dailySummary.weatherConditions);

    console.log('Updated Daily Summary:', dailySummary);
  }

  // Calculate the average temperature from all recorded temps
  private calculateAverageTemperature(): number {
    const sum = this.temperatures.reduce((acc, temp) => acc + temp, 0);
    return sum / this.temperatures.length;
  }

  // Simplified calculation for dominant weather condition
  private calculateDominantCondition(conditions: string[]): string {
    const frequency = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
  }

  public getDailyWeatherSummaries(): DailyWeatherData[] {
    return this.dailyWeatherSummaries;
  }
  ;

constructor(private http: HttpClient) {}

public saveDailyWeatherSummary(summary: any) {
    return this.http.post('http://localhost:3000/api/weather-summary', summary);
}

}
