import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vocalsListComponent } from './vocals-list.component';

describe('OrdersListComponent', () => {
  let component: vocalsListComponent;
  let fixture: ComponentFixture<vocalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ vocalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(vocalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
