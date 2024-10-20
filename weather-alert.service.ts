import { Injectable } from '@angular/core';
import { DailyWeatherService } from './daily-weather.service';  // Import the daily weather service
import { DailyWeatherData } from '../models/daily-weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherAlertService {
  // Configurable threshold
  private temperatureThreshold = 35; // Threshold for temperature in °C
  private consecutiveUpdates = 0;    // Count for consecutive breaches of the threshold
  private consecutiveLimit = 2;      // Number of consecutive updates to trigger alert

  constructor(private dailyWeatherService: DailyWeatherService) {}

  // Method to check if temperature alerts are triggered
  checkTemperatureAlerts() {
    const summaries: DailyWeatherData[] = this.dailyWeatherService.getDailyWeatherSummaries();

    // Loop through daily summaries to check the maximum temperature
    summaries.forEach(summary => {
      if (summary.maximumTemperature > this.temperatureThreshold) {
        this.consecutiveUpdates++;  // Increment the consecutive updates counter
        if (this.consecutiveUpdates >= this.consecutiveLimit) {
          this.triggerAlert(summary);  // Trigger alert if the limit is reached
        }
      } else {
        this.consecutiveUpdates = 0;  // Reset the count if condition is not met
      }
    });
  }

  // Trigger the alert
  private triggerAlert(summary: DailyWeatherData) {
    console.log(`⚠️ Alert: Temperature exceeded ${this.temperatureThreshold}°C in ${summary.date}!`);
    // Here you could also send an email, push notification, or display in the UI
  }

  // Periodically check alerts (this method can be called from weather-display component)
  triggerAlerts() {
    this.checkTemperatureAlerts();  // Call the method to check for temperature alerts
  }
}
