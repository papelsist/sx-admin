import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CarteraCreditoActions, CarteraCreditoActionTypes } from '../actions/credito';

export interface State  {
  selectedCliente: {}
}

export const initialState: State = {
  selectedCliente: null
};

export function reducer(
  state = initialState,
  action: CarteraCreditoActions
): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getSelected = (state: State) => state.selectedCliente;