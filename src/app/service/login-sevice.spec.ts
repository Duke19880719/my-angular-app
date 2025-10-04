import { TestBed } from '@angular/core/testing';

import { LoginService } from './login-sevice';

describe('LoginSevice', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
