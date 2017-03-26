import { TestBed, inject } from '@angular/core/testing';

import { AppuserService } from './appuser.service';

describe('AppuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppuserService]
    });
  });

  it('should ...', inject([AppuserService], (service: AppuserService) => {
    expect(service).toBeTruthy();
  }));
});
