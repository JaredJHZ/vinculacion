import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMaestroComponent } from './crear-maestro.component';

describe('CrearMaestroComponent', () => {
  let component: CrearMaestroComponent;
  let fixture: ComponentFixture<CrearMaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
