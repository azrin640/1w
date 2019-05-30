import { TestBed } from '@angular/core/testing';

import { ForgotPassword2Service } from './forgot-password-2.service';

describe('ForgotPassword2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgotPassword2Service = TestBed.get(ForgotPassword2Service);
    expect(service).toBeTruthy();
  });
});
