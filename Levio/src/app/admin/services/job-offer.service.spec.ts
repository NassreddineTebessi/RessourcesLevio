import { TestBed, inject } from '@angular/core/testing';

import { JobOfferService } from './job-offer.service';

describe('JobOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobOfferService]
    });
  });

  it('should be created', inject([JobOfferService], (service: JobOfferService) => {
    expect(service).toBeTruthy();
  }));
});
