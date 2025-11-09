import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseslistComponent } from './phraseslist.component';

describe('PhraseslistComponent', () => {
  let component: PhraseslistComponent;
  let fixture: ComponentFixture<PhraseslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhraseslistComponent]
    });
    fixture = TestBed.createComponent(PhraseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
