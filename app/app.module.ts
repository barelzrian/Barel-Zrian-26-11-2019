import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { WeatherListComponent } from "./weather/weather-list/weather-list.component";
import { AppRoutingModule } from './app.routing-module';
import { FavWeatherComponent } from './fav-weather/fav-weather.component';
import {DemoMaterialModule} from './material.module';
import { TopLocationsComponent } from './top-locations/top-locations.component';
import { AgmCoreModule } from "@agm/core";
import { MapsComponent } from "./maps/maps.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherListComponent,
    FavWeatherComponent,
    TopLocationsComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCpyDUkEbh-ZVnn4mniTmF-TfwOIXOh3bw'
    })
  ],
  entryComponents: [HeaderComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
