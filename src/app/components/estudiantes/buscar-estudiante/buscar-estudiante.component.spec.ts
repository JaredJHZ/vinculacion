import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEstudianteComponent } from './buscar-estudiante.component';

describe('BuscarEstudianteComponent', () => {
  let component: BuscarEstudianteComponent;
  let fixture: ComponentFixture<BuscarEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
