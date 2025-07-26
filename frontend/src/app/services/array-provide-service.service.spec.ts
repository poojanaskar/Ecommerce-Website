import { TestBed } from '@angular/core/testing';

import { ArrayProvideServiceService } from './array-provide-service.service';

describe('ArrayProvideServiceService', () => {
  let service: ArrayProvideServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayProvideServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
