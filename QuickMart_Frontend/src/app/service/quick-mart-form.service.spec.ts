import { TestBed } from '@angular/core/testing';

import { QuickMartFormService } from './quick-mart-form.service';

describe('QuickMartFormService', () => {
  let service: QuickMartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickMartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
