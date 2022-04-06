import { TestBed } from '@angular/core/testing';

import { EngineResponseService } from './engine-response.service';

describe('EngineResponseService', () => {
  let service: EngineResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
