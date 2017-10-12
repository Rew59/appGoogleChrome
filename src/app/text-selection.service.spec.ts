import { TestBed, inject } from '@angular/core/testing';

import { TextSelectionService } from './text-selection.service';

describe('TextSelectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextSelectionService]
    });
  });

  it('should be created', inject([TextSelectionService], (service: TextSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
