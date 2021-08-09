import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionesShowComponent } from './autorizaciones-show.component';

describe('AutorizacionesShowComponent', () => {
  let component: AutorizacionesShowComponent;
  let fixture: ComponentFixture<AutorizacionesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
