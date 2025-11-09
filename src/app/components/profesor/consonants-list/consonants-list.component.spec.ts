import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsonantsListComponent } from './consonants-list.component';

describe('ConsonantsListComponent', () => {
  let component: ConsonantsListComponent;
  let fixture: ComponentFixture<ConsonantsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsonantsListComponent]
    });
    fixture = TestBed.createComponent(ConsonantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
