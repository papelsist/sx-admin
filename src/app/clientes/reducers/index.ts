import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromClientes from './clientes';
import * as fromRoot from '../../reducers';

export interface ClientesState {
  clientes: fromClientes.State
}

export interface State extends fromRoot.State {
  clientes: ClientesState;
}

export const reducers = {
  clientes: fromClientes.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `clientes` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.clientesState$ = state$.pipe(select(getClientesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getClientesState = createFeatureSelector<ClientesState>('clientes');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getClienteEntitiesState = createSelector(
  getClientesState,
  state => state.clientes
);

export const getSelectedClienteId = createSelector(
  getClienteEntitiesState,
  fromClientes.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getClienteIds,
  selectEntities: getClienteEntities,
  selectAll: getAllClientes,
  selectTotal: getTotalClientes,
} = fromClientes.adapter.getSelectors(getClienteEntitiesState);

export const getSelectedCliente = createSelector(
  getClienteEntities,
  getSelectedClienteId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);