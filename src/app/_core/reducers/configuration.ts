import * as config from '../actions/configuration';
import {Application} from '../models/application';

export interface State {
  application: Application;
  modulo: string;
}

const initialState: State = {
  application: {name: 'APP', description: 'Luxor based Application', image: '/assets/images/london-view.jpeg'},
  modulo: 'SX-?'
};

export function reducer(state = initialState, action: config.Actions): State {
  switch (action.type) {
    case config.SET_APPLICATION:
      return {
        ... state,
        application: action.payload,
      };
    case config.SET_MODULO:
      return {
        ... state,
        modulo: action.payload
      };
    default:
      return state;
  }
}

export const getApplication = (state: State) => state.application;
export const getModulo = (state: State) => state.modulo;

