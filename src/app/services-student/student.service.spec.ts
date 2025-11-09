import { TestBed } from '@angular/core/testing';

import { DishService } from './student.service';

describe('DishService', () => {
  let service: DishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
