import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarparkDetailsComponent } from './carpark-details.component';

describe('CarparkDetailsComponent', () => {
  let component: CarparkDetailsComponent;
  let fixture: ComponentFixture<CarparkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarparkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarparkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
