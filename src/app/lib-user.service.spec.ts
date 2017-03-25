import { TestBed, inject } from '@angular/core/testing';

import { LibUserService } from './lib-user.service';

describe('LibUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibUserService]
    });
  });

  it('should ...', inject([LibUserService], (service: LibUserService) => {
    expect(service).toBeTruthy();
  }));
});
