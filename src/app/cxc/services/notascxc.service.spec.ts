import { TestBed, inject } from '@angular/core/testing';

import { NotascxcService } from './notascxc.service';

describe('NotascxcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotascxcService]
    });
  });

  it('should be created', inject([NotascxcService], (service: NotascxcService) => {
    expect(service).toBeTruthy();
  }));
});
