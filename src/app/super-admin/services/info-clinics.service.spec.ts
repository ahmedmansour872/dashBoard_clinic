import { TestBed } from '@angular/core/testing';

import { InfoClinicsService } from './info-clinics.service';

describe('InfoClinicsService', () => {
  let service: InfoClinicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoClinicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
