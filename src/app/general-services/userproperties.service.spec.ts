import { TestBed } from '@angular/core/testing';

import { UserpropertiesService } from './userproperties.service';

describe('UserpropertiesService', () => {
  let service: UserpropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
