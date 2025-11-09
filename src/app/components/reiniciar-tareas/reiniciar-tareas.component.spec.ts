import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReiniciarTareasComponent } from './reiniciar-tareas.component';

describe('ReiniciarTareasComponent', () => {
  let component: ReiniciarTareasComponent;
  let fixture: ComponentFixture<ReiniciarTareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReiniciarTareasComponent]
    });
    fixture = TestBed.createComponent(ReiniciarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
