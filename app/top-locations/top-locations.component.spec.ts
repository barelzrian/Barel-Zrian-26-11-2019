import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLocationsComponent } from './top-locations.component';

describe('TopLocationsComponent', () => {
  let component: TopLocationsComponent;
  let fixture: ComponentFixture<TopLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
