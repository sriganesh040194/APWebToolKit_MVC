import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrradianceComponent } from './irradiance.component';

describe('IrradianceComponent', () => {
  let component: IrradianceComponent;
  let fixture: ComponentFixture<IrradianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrradianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrradianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
