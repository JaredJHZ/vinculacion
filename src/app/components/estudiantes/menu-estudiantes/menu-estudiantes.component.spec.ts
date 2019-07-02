import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEstudiantesComponent } from './menu-estudiantes.component';

describe('MenuEstudiantesComponent', () => {
  let component: MenuEstudiantesComponent;
  let fixture: ComponentFixture<MenuEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
