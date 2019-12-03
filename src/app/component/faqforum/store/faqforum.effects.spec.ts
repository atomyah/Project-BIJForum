import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FaqforumEffects } from './faqforum.effects';

describe('FaqforumEffects', () => {
  let actions$: Observable<any>;
  let effects: FaqforumEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaqforumEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<FaqforumEffects>(FaqforumEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
