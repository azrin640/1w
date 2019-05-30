import { TestBed } from '@angular/core/testing';

import { ResetPassword2Service } from './reset-password-2.service';

describe('ResetPassword2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPassword2Service = TestBed.get(ResetPassword2Service);
    expect(service).toBeTruthy();
  });
});
