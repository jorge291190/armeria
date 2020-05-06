import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportecalibresComponent } from './reportecalibres.component';

describe('ReportecalibresComponent', () => {
  let component: ReportecalibresComponent;
  let fixture: ComponentFixture<ReportecalibresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportecalibresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportecalibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
