import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SxNavListComponent } from './sx-nav-list.component';

describe('SxNavListComponent', () => {
  let component: SxNavListComponent;
  let fixture: ComponentFixture<SxNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SxNavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SxNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
