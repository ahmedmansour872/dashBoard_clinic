import { TestBed } from '@angular/core/testing';

import { ReciptionGuard } from './reciption.guard';

describe('ReciptionGuard', () => {
  let guard: ReciptionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReciptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
