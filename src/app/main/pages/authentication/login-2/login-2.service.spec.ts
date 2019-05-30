import { TestBed } from '@angular/core/testing';

import { Login2Service } from './login-2.service';

describe('Login2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Login2Service = TestBed.get(Login2Service);
    expect(service).toBeTruthy();
  });
});
