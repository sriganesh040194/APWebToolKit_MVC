import { TestBed } from '@angular/core/testing';

import { IrradianceService } from './irradiance.service';

describe('IrradianceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IrradianceService = TestBed.get(IrradianceService);
    expect(service).toBeTruthy();
  });
});
