import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { WeatherItem } from '../weather/weather-list/weather-item';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  cityByLocation : any
cityName : string
  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
    this.lat = 	32.109333
    this.lng = 34.855499
  }

  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
  }
  
  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    this.lat= $event.coords.lat,
    this.lng= $event.coords.lng,
    this.weatherService.serarchWithGps(this.lat, this.lng)
    .subscribe(data => {
      this.cityByLocation = data.Key
      this.cityName = data.LocalizedName
      this.getsTheKey()
    })
  }

  getsTheKey() {
    this.weatherService.locationByKey(this.cityByLocation)
      .subscribe(data => {
        const weatherItem = new WeatherItem(this.cityByLocation,this.cityName, data[0].WeatherText, data[0].Temperature.Metric.Value + data[0].Temperature.Metric.Unit)
        this.weatherService.addWeatherItem(weatherItem)
      })
  }

  onClickLocation() {
    this.weatherService.serarchWithGps(this.lat, this.lng)
      .subscribe(data => {
        this.cityByLocation = data[0].Key
      })
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
  ]

}


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
