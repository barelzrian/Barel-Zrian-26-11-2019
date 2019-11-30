import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from 'rxjs';

import { WeatherService } from "../weather.service";
import { HttpClient } from "selenium-webdriver/http";
import { FormControl } from "@angular/forms";
import { City } from "../city.model";
import { WeatherItem } from "./weather-item";
import { WEATHER_ITEMS } from "./weather.data";
import { startWith, map, switchMap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FavWeatherService } from "src/app/fav-weather/fav-weather.service";
import { MatSnackBar } from "@angular/material";
import { OverlayContainer } from "@angular/cdk/overlay";
import { ThemeService } from "src/app/theme.service";


@Component({
  templateUrl: "./weather-list.component.html",
  styleUrls: ["./weather-list.component.css"],
  providers: [WeatherService]
})
export class WeatherListComponent implements OnInit {
  private searchStream = new Subject<string>()
  weatherItem: WeatherItem;
  weatherItems: WeatherItem[];
  cities: WeatherItem[];
  keys: City[]
  cityByName: City[]
  city: City
  cityName = ''
  cityByNameData: any
  cityByNameKey = 215854
  fiveDaysForecasts: any
  telAviv_Forecast: any
  WeatherText = ''
  favWeatherItem: WeatherItem
  data: any = {}
  message1 = 'added to search list';
  message2 = 'Added to the favorites ! ❤️'
  action = 'close';

  constructor(public weatherService: WeatherService, private favWeatherService: FavWeatherService, private _snackBar: MatSnackBar,
    private themeService: ThemeService) { }

  onSearchLocation(cityName: string) {
    this.searchStream
      .next(cityName)
  }
  myControl = new FormControl();
  options: WeatherItem[] = this.cities
  filteredOptions: Observable<WeatherItem[]>;

  toggleTheme() {
    this.themeService.toggleTheme()
  }

  ngOnInit() {
    this.searchForFiveDaysForecast()
    this.searchStream
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .pipe(switchMap((input: string) => this.weatherService.serarchWeatherData(input)))
      .subscribe(
        data => {
          for (let i in data) {
            this.data = data[i].LocalizedName
          }
        }
      )

    this.weatherService.getTel_AvivForecast()
      .subscribe(data => {
        this.telAviv_Forecast = data[0]
      })
    this.weatherItems = WEATHER_ITEMS
  }

  onSubmit5days(cityName: string) {
    this.weatherService.serarchWeatherData(this.cityName)
      .subscribe(data => {
        this.cityByNameKey = data[0].Key
        this.searchForFiveDaysForecast()
      })
  }

  onSubmit(cityName: string) {
    this.weatherService.serarchWeatherData(this.cityName)
      .subscribe(data => {
        this.cityByNameKey = data[0].Key
        this.onSubmit2()
      })
  }

  onSubmit2() {
    this.weatherService.locationByKey(this.cityByNameKey)
      .subscribe(data => {
        const weatherItem = new WeatherItem(this.cityByNameKey, this.cityName, data[0].WeatherText, data[0].Temperature.Metric.Value + data[0].Temperature.Metric.Unit)
        this.weatherService.addWeatherItem(weatherItem)
      })
  }

  searchForFiveDaysForecast() {
    this.weatherService.getFiveDaysForecast(this.cityByNameKey)
      .subscribe(data => {
        this.fiveDaysForecasts = data.DailyForecasts
      })
  }

  onSaveNew() {
    const cities = this.weatherService.getWeatherItems().map(function (element: WeatherItem) {
      return element.cityName;
    })
    this.favWeatherService.saveNewProfile(cities)
  }

  addToFav(weatherItem: WeatherItem) {
    this.favWeatherItem = weatherItem;
    this.favWeatherService.addToFav(this.favWeatherItem as WeatherItem);
  }

  openSnackBarSearch() {
    this._snackBar.open(this.cityName + "  " + this.message1, this.action, {
      duration: 2000,
    });
  }

  openSnackBarFav() {
    this._snackBar.open(this.message2, this.action, {
      duration: 2000,
    });
  }


}

