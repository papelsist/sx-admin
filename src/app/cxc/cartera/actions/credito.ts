import { Action } from '@ngrx/store';

export enum CarteraCreditoActionTypes {
  Search = '[Cartera credito] Search',
}

export class Search implements Action {
  readonly type = CarteraCreditoActionTypes.Search;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CarteraCreditoActions = Search ;
