import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMaestrosComponent } from './menu-maestros.component';

describe('MenuMaestrosComponent', () => {
  let component: MenuMaestrosComponent;
  let fixture: ComponentFixture<MenuMaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
