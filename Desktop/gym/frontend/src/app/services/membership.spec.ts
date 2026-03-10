import { TestBed } from '@angular/core/testing';

import { Membership } from './membership';

describe('Membership', () => {
  let service: Membership;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Membership);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
