import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component'; // Check this path
import { WeatherDisplayComponent } from './weather-display/weather-display.component'; // Check this path
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent, // Declare the component
    WeatherDisplayComponent // Declare the component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Make sure HttpClientModule is imported
    FormsModule // Ensure FormsModule is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





