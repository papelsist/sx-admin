import { Action } from '@ngrx/store';
import {Application} from '../models/application';

export const SET_APPLICATION = '[Configuration] set application metadata';
export const SET_MODULO = '[Configuration] set modulo';

export class SetApplication implements Action {
  readonly type = SET_APPLICATION;

  constructor(public payload: Application) {}
}
export class SetModulo implements Action {
  readonly type = SET_MODULO;

  constructor(public payload: string) {}
}


export type Actions = SetApplication | SetModulo ;
