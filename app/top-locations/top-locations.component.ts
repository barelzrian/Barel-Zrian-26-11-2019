import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { WeatherItem } from '../weather/weather-list/weather-item';

@Component({
  selector: 'app-top-locations',
  templateUrl: './top-locations.component.html',
  styleUrls: ['./top-locations.component.css']
})
export class TopLocationsComponent implements OnInit {
  cities: WeatherItem[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getLocationByCity()
      .subscribe(data => {
        this.cities = data
      })
  }
}
