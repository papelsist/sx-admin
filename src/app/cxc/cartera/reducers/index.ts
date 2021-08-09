import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCredito from './credito';
import * as fromRoot from '../../../reducers';

export interface CarteraState {
  credito: fromCredito.State
}

export interface State extends fromRoot.State {
  cartera: CarteraState;
}

export const reducers = {
  credito: fromCredito.reducer,
};


export const getCarteraCreditoState = createFeatureSelector<CarteraState>('credito');

export const getCreditoState = createSelector(
  getCarteraCreditoState,
  state => state.credito
);
export const getSelectedCliente = createSelector(
  getCreditoState,
  state => state.selectedCliente
);

