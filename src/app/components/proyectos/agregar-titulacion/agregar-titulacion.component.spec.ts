import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTitulacionComponent } from './agregar-titulacion.component';

describe('AgregarTitulacionComponent', () => {
  let component: AgregarTitulacionComponent;
  let fixture: ComponentFixture<AgregarTitulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTitulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTitulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
