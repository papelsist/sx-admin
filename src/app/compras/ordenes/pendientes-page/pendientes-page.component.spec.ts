import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesPageComponent } from './pendientes-page.component';

describe('PendientesPageComponent', () => {
  let component: PendientesPageComponent;
  let fixture: ComponentFixture<PendientesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendientesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
