export interface DailyWeatherData {
  date: string; // Use ISO format
  averageTemperature: number;
  maximumTemperature: number;
  minimumTemperature: number;
  dominantCondition: string; // Example: "Clear", "Cloudy", etc.
  weatherConditions: string[];
}
