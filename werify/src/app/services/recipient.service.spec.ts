import { TestBed } from '@angular/core/testing';

import { RecipientService } from './recipient.service';

describe('RecipientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipientService = TestBed.get(RecipientService);
    expect(service).toBeTruthy();
  });
});
