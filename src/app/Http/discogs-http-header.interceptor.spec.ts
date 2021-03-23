import { TestBed } from '@angular/core/testing';

import { DiscogsHttpHeaderInterceptor } from './discogs-http-header.interceptor';

describe('DiscogsHttpHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DiscogsHttpHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DiscogsHttpHeaderInterceptor = TestBed.inject(DiscogsHttpHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
