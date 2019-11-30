import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';
import { FavWeatherComponent } from './fav-weather/fav-weather.component';
import { TopLocationsComponent } from './top-locations/top-locations.component';
import { MapsComponent } from './maps/maps.component';


const routes: Routes =[
{path: '', component: WeatherListComponent},
{path: 'favorites', component: FavWeatherComponent},
{path: 'topweather', component: TopLocationsComponent },
{path: 'maps', component: MapsComponent },


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
