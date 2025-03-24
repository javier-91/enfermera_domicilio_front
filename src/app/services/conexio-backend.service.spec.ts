import { TestBed } from '@angular/core/testing';

import { ConexioBackendService } from './conexio-backend.service';

describe('ConexioBackendService', () => {
  let service: ConexioBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexioBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
