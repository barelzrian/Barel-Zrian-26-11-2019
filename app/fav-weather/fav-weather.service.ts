import { Injectable } from '@angular/core';
import { Profile } from './fav-profile'
import { WeatherItem } from '../weather/weather-list/weather-item';


@Injectable({
  providedIn: 'root'
})
export class FavWeatherService {
  weatherItem: WeatherItem
  private profiles: Profile[];
  favLocations: WeatherItem[];

  constructor() {
    this.profiles = [
      new Profile('Default Profile', ['California'])
    ]
  }

  addToFav(weatherItem: WeatherItem) {
    this.favLocations.push(weatherItem);
  }

  saveNewProfile(cities: string[]) {
    const profileName = 'Profile ' + this.profiles.length;
    const profile = new Profile(profileName, cities);
    this.profiles.push(profile)
  }

  public getProfiles() {
    return this.profiles;
  }

  public deleteProfile(profile: Profile) {
    this.profiles.splice(this.profiles.indexOf(profile), 1);
  }
}
