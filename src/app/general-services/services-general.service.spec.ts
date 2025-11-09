import { TestBed } from '@angular/core/testing';

import { ServicesGeneralService } from './services-general.service';

describe('ServicesGeneralService', () => {
  let service: ServicesGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
