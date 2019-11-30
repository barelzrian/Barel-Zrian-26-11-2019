import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { City } from './city.model'
import { catchError } from 'rxjs/operators';
import { WeatherItem } from "./weather-list/weather-item";
import { WEATHER_ITEMS } from "./weather-list/weather.data";

@Injectable({ providedIn: "root" })
export class WeatherService {
  cityByName = {}
  constructor(private http: HttpClient) { }



  // apiUrl = 'https://dataservice.accuweather.com/locations/v1/topcities/50?apikey=u6SfkQU3hPGAX9glG9uOOV7xgpPu9UNN'
  // apiAutoComplete = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=u6SfkQU3hPGAX9glG9uOOV7xgpPu9UNN&q='
  // currentWeatherByKey = 'https://dataservice.accuweather.com/currentconditions/v1/'
  // apiKey = '?apikey=u6SfkQU3hPGAX9glG9uOOV7xgpPu9UNN'
  // fiveDaysForecast = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
  // telAvivForecast = "https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=u6SfkQU3hPGAX9glG9uOOV7xgpPu9UNN"
  // geoLocaionApi = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=u6SfkQU3hPGAX9glG9uOOV7xgpPu9UNN&q="

  getLocationByCity() {
    return this.http.get<City[]>(this.apiUrl)
  }

  autoCompleteSearch(city: City) {
    return this.http.get(this.apiAutoComplete + city)

  }

  serarchWeatherData(cityName: string): Observable<any> {
    return this.http.get(this.apiAutoComplete + cityName)
      .pipe(map(response => response))
      .pipe(catchError(this.errorHandler))

  }

  locationByKey(cityByNameData: any): Observable<any> {
    return this.http.get(this.currentWeatherByKey + cityByNameData + this.apiKey)
      .pipe(map(response => response))
      .pipe(catchError(this.errorHandler))
  }

  getFiveDaysForecast(cityByNameData: any): Observable<any> {
    return this.http.get(this.fiveDaysForecast + cityByNameData + this.apiKey)
      .pipe(map(response => response))
      .pipe(catchError(this.errorHandler))
  }

  searchKey(Key: City) {
    return this.http.get(this.currentWeatherByKey + Key + this.apiKey)
  }

  getTel_AvivForecast(): Observable<any> {
    return this.http.get(this.telAvivForecast)
  }

  serarchWithGps(lat: number, lng: number): Observable<any> {
    return this.http.get(this.geoLocaionApi + lat + '%2C' + lng)
    .pipe(map(response => response))
    .pipe(catchError(this.errorHandler))

  }

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem)
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  clearWeatherItems() {
    WEATHER_ITEMS.splice(0)
  }


}
