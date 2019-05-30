import { TestBed } from '@angular/core/testing';

import { Register2Service } from './register-2.service';

describe('Register2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Register2Service = TestBed.get(Register2Service);
    expect(service).toBeTruthy();
  });
});
