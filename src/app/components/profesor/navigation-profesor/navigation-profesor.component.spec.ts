import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationProfesorComponent } from './navigation-profesor.component';

describe('NavigationProfesorComponent', () => {
  let component: NavigationProfesorComponent;
  let fixture: ComponentFixture<NavigationProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationProfesorComponent]
    });
    fixture = TestBed.createComponent(NavigationProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
