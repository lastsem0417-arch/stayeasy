import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { memberGuard } from './member-guard';

describe('memberGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => memberGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
