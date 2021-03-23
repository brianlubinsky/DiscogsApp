import { TestBed } from '@angular/core/testing';

import { RequestLogInterceptor } from './request-log.interceptor';

describe('RequestLogInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestLogInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestLogInterceptor = TestBed.inject(RequestLogInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
