import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMaestrosComponent } from './buscador-maestros.component';

describe('BuscadorMaestrosComponent', () => {
  let component: BuscadorMaestrosComponent;
  let fixture: ComponentFixture<BuscadorMaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorMaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
