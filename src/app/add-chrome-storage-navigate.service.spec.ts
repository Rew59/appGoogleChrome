import { TestBed, inject } from '@angular/core/testing';

import { AddChromeStorageNavigateService } from './add-chrome-storage-navigate.service';

describe('AddChromeStorageNavigateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddChromeStorageNavigateService]
    });
  });

  it('should be created', inject([AddChromeStorageNavigateService], (service: AddChromeStorageNavigateService) => {
    expect(service).toBeTruthy();
  }));
});
