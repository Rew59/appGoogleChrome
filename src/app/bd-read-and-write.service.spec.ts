import { TestBed, inject } from '@angular/core/testing';

import { BdReadAndWriteService } from './bd-read-and-write.service';

describe('BdReadAndWriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BdReadAndWriteService]
    });
  });

  it('should be created', inject([BdReadAndWriteService], (service: BdReadAndWriteService) => {
    expect(service).toBeTruthy();
  }));
});
