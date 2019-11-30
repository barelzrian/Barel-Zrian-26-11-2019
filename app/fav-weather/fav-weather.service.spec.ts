import { TestBed } from '@angular/core/testing';

import { FavWeatherService } from './fav-weather.service';

describe('FavWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavWeatherService = TestBed.get(FavWeatherService);
    expect(service).toBeTruthy();
  });
});
