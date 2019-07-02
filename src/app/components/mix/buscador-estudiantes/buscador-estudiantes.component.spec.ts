import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEstudiantesComponent } from './buscador-estudiantes.component';

describe('BuscadorEstudiantesComponent', () => {
  let component: BuscadorEstudiantesComponent;
  let fixture: ComponentFixture<BuscadorEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
