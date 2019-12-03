import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FaqforumActions, FaqforumActionTypes } from './faqforum.actions';
import { faqComment } from '../../../class/baseClass';

export interface State extends EntityState<faqComment> {
  loading: boolean;
}

export const adapter: EntityAdapter<faqComment> = createEntityAdapter<faqComment>();

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: FaqforumActions
): State {
  switch (action.type) {
    case FaqforumActionTypes.AddFaqforum: {
      return { ...state, loading: true };
    }

    case FaqforumActionTypes.UpdateFaqforum: {
      return { ...adapter.updateOne(action.payload.faqforum, state), loading: true };
    }

    case FaqforumActionTypes.DeleteFaqforum: {
      return { ...adapter.removeOne(action.payload.id, state), loading: true };
    }

    case FaqforumActionTypes.LoadFaqforums: {
      return { ...state, loading: true };
    }

    case FaqforumActionTypes.LoadFaqforumsSuccess: {
      return { ...adapter.upsertMany(action.payload.faqforums, state), loading: false };
    }

    case FaqforumActionTypes.LoadFaqforumsFail: {
      return { ...state, loading: false };
    }

    case FaqforumActionTypes.WriteFaqforumSuccess: {
      return { ...state, loading: false };
    }

    case FaqforumActionTypes.WriteFaqforumFail: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectFaqforum = createFeatureSelector<State>('faqforum');
export const getFaqforumLoading = createSelector(selectFaqforum, state => state.loading);
export const selectAllFaqforums = createSelector(selectFaqforum, selectAll);