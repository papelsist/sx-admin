import { Action } from '@ngrx/store';
import { Cliente } from '../models/cliente';

export enum ClienteActionTypes {
  Search = '[Cliente] Search',
  SearchComplete = '[Cliente] Search Complete',
  SearchError = '[Cliente] Search Error',
  Load = '[Cliente] Load',
  Select = '[Cliente] Select',
}

export class Search implements Action {
  readonly type = ClienteActionTypes.Search;

  constructor(public payload: string) {}
}
export class SearchComplete implements Action {
  readonly type = ClienteActionTypes.SearchComplete;

  constructor(public payload: Cliente[]) {}
}

export class SearchError implements Action {
  readonly type = ClienteActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = ClienteActionTypes.Load;

  constructor(public payload: Cliente) {}
}

export class Select implements Action {
  readonly type = ClienteActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ClienteActions = Search | SearchComplete | SearchError | Load | Select;
