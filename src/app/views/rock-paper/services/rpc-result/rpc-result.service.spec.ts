import { TestBed } from '@angular/core/testing';

import { RpcResultService } from './rpc-result.service';

describe('RpcResultService', () => {
  let service: RpcResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RpcResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
