import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDisplayComponent } from './weather-display/weather-display.component'; // Adjust this path if necessary

const routes: Routes = [
  { path: '', component: WeatherDisplayComponent } // Default route to display the weather
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
