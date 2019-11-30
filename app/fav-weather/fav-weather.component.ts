import { Component, OnInit } from '@angular/core';
import { FavWeatherService } from './fav-weather.service';
import { Profile } from './fav-profile'
import { WeatherService } from '../weather/weather.service';
import { WeatherItem } from '../weather/weather-list/weather-item';
import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-fav-weather',
  templateUrl: './fav-weather.component.html',
  styleUrls: ['./fav-weather.component.css']
})
export class FavWeatherComponent implements OnInit {
  public profiles: Profile[];
  cityName = 'city...'
  cityNames = []
  name = {}
  cityByNameKey = 215854

  constructor(private favWeatherService: FavWeatherService, private weatherService: WeatherService, private themeService: ThemeService) { }

  ngOnInit() {
    this.profiles = this.favWeatherService.getProfiles();
  }

  onSaveNew() {
    const cities = this.weatherService.getWeatherItems().map(function (element: WeatherItem) {
      return element.cityName;
    })
    this.favWeatherService.saveNewProfile(cities)
  }

  private onDeleteProfile(e: Event, profile: Profile) {
    e.stopPropagation();
    this.favWeatherService.deleteProfile(profile);
  }

  onLoadProfile(profile: Profile) {
    this.weatherService.clearWeatherItems()
    for (let i = 0; i < profile.cities.length; i++) {
      this.weatherService.serarchWeatherData(profile.cities[i])

        .subscribe(
          data => {
            this.cityByNameKey = data[0].Key
            this.cityName = data[0].LocalizedName


            for (let i in this.cityNames) {
              this.cityNames = this.cityNames[i].LocalizedName
              this.name = data[i].LocalizedName
            }

            this.weatherService.locationByKey(this.cityByNameKey)
              .subscribe(data => {
                const weatherItem = new WeatherItem(this.cityByNameKey, this.cityName, data[0].WeatherText, data[0].Temperature.Metric.Value + data[0].Temperature.Metric.Unit)
                this.weatherService.addWeatherItem(weatherItem)

              })
          }
        )
    }
  }

}
