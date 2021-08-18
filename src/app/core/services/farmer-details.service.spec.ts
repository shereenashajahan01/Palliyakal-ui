import { TestBed } from '@angular/core/testing';

import { FarmerDetailsService } from './farmer-details.service';

describe('FarmerDetailsService', () => {
  let service: FarmerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
