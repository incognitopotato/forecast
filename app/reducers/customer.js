import { createReducer } from 'redux-create-reducer';
import * as ac from '../actions';

const initialState = {
  initialized: false,
  firstName: '',
  lastName: '',
  gender: '',
  prefix: ''
};

export const customer = createReducer(initialState, {

  [ac.UPDATE_CUSTOMER]: (state, { data }) => {
    return {
      ...state,
      ...data
    };
  },

    [ac.INITIALIZE_CUSTOMER]: (state) => {
    return {
      ...state,
      initialized: true
    };
  }

});
