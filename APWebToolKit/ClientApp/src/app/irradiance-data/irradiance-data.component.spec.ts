import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrradianceDataComponent } from './irradiance-data.component';

describe('IrradianceDataComponent', () => {
  let component: IrradianceDataComponent;
  let fixture: ComponentFixture<IrradianceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrradianceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrradianceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
