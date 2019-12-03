import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { faqComment } from '../../../class/baseClass';

export enum FaqforumActionTypes {
  LoadFaqforums = '[Faqforum] Load Faqforums',
  LoadFaqforumsSuccess = '[Faqforum] Load Faqforums Success',
  LoadFaqforumsFail = '[Faqforum] Load Faqforums Fail',
  AddFaqforum = '[Faqforum] Add Faqforum',
  UpdateFaqforum = '[Faqforum] Update Faqforum',
  DeleteFaqforum = '[Faqforum] Delete Faqforum',
  WriteFaqforumSuccess = '[Faqforum] Write Faqforum Success',
  WriteFaqforumFail = '[Faqforum] Write Faqforum Fail'
}

export class LoadFaqforums implements Action {
  readonly type = FaqforumActionTypes.LoadFaqforums;

  constructor(public payload: { faqforums: faqComment[] }) {}
}

export class LoadFaqforumsSuccess implements Action {
  readonly type = FaqforumActionTypes.LoadFaqforumsSuccess;

  constructor(public payload: { faqforums: faqComment[] }) {}
}

export class LoadFaqforumsFail implements Action {
  readonly type = FaqforumActionTypes.LoadFaqforumsFail;

  constructor(public payload?: { error: any }) {}
}

export class AddFaqforum implements Action {
  readonly type = FaqforumActionTypes.AddFaqforum;

  constructor(public payload: { faqforum: faqComment }) {}
}

export class UpdateFaqforum implements Action {
  readonly type = FaqforumActionTypes.UpdateFaqforum;

  constructor(public payload: { faqforum: Update<faqComment> }) {}
}

export class DeleteFaqforum implements Action {
  readonly type = FaqforumActionTypes.DeleteFaqforum;

  constructor(public payload: { id: string }) {}
}

export class WriteFaqforumSuccess implements Action {
  readonly type = FaqforumActionTypes.WriteFaqforumSuccess;

  constructor(public payload: { faqforums: faqComment[] }) {}
}

export class WriteFaqforumFail implements Action {
  readonly type = FaqforumActionTypes.WriteFaqforumFail;

  constructor(public payload?: { error: any }) {}
}

export type FaqforumActions =
 LoadFaqforums
 | LoadFaqforumsSuccess
 | LoadFaqforumsFail
 | AddFaqforum
 | UpdateFaqforum
 | DeleteFaqforum
 | WriteFaqforumSuccess
 | WriteFaqforumFail;
