import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllableListComponent } from './syllable-list.component';

describe('SyllableListComponent', () => {
  let component: SyllableListComponent;
  let fixture: ComponentFixture<SyllableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyllableListComponent]
    });
    fixture = TestBed.createComponent(SyllableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
