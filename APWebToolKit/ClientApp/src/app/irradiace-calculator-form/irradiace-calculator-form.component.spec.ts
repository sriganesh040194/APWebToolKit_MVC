import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrradiaceCalculatorFormComponent } from './irradiace-calculator-form.component';

describe('IrradiaceCalculatorFormComponent', () => {
  let component: IrradiaceCalculatorFormComponent;
  let fixture: ComponentFixture<IrradiaceCalculatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrradiaceCalculatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrradiaceCalculatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
