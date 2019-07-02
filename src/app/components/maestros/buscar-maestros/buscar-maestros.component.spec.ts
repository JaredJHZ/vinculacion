import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarMaestrosComponent } from './buscar-maestros.component';

describe('BuscarMaestrosComponent', () => {
  let component: BuscarMaestrosComponent;
  let fixture: ComponentFixture<BuscarMaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarMaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
