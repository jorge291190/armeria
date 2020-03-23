import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibresComponent } from './calibres.component';

describe('CalibresComponent', () => {
  let component: CalibresComponent;
  let fixture: ComponentFixture<CalibresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalibresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
