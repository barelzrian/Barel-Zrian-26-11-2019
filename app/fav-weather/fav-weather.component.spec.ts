import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavWeatherComponent } from './fav-weather.component';

describe('FavWeatherComponent', () => {
  let component: FavWeatherComponent;
  let fixture: ComponentFixture<FavWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
