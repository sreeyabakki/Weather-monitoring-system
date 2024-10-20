import { TestBed } from '@angular/core/testing';

import { DailyWeatherService } from './daily-weather.service';

describe('DailyWeatherService', () => {
  let service: DailyWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
