import { TestBed } from '@angular/core/testing';

import { SortingStrategyService } from './sorting-strategy.service';

describe('SortingStrategyService', () => {
  let service: SortingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
