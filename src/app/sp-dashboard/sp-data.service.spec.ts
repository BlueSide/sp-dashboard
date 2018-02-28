import { TestBed, inject } from '@angular/core/testing';

import { SpDataService } from './sp-data.service';

describe('SpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpDataService]
    });
  });

  it('should be created', inject([SpDataService], (service: SpDataService) => {
    expect(service).toBeTruthy();
  }));
});
