import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationCoordinatorComponent } from './navigation-coordinator.component';

describe('NavigationCoordinatorComponent', () => {
  let component: NavigationCoordinatorComponent;
  let fixture: ComponentFixture<NavigationCoordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationCoordinatorComponent]
    });
    fixture = TestBed.createComponent(NavigationCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
