import { views } from '../utils/constants';
import * as ac from '../actions';

const initialState = {
  view: {
    main: views.MAIN_SEARCH_VIEW,
    header: views.HEADER_DEFAULT_VIEW
  },
  zipcode: null,
  forecast: null,
  city: null
};

const rootReducerConfig = {
  [ac.UPDATE_ZIPCODE]: (state, { data }) => ({
    ...state,
    ...data
  }),

  [ac.UPDATE_VIEW]: (state, { data }) => {
    switch (data.area) {
      case views.HEADER_AREA:
        return {
          ...state,
          view: {
            ...state.view,
            header: data.view
          }
        };

      case views.MAIN_AREA:
        return {
          ...state,
          view: {
            ...state.view,
            main: data.view
          }
        };

      default:
        throw new Error(`ERROR: ${data.area} is not a valid view area.  Use HEADER_AREA or MAIN_AREA constants.`);
    }
  },

  [ac.UPDATE_FORECAST]: (state, { data }) => ({
    ...state,
    forecast: data.forecast
  }),

  [ac.UPDATE_CITY]: (state, { data }) => ({
    ...state,
    city: {
      ...state.forecast,
      ...data.city
    }
  })
};

export default function rootReducer(state = initialState, action) {
  if ({}.hasOwnProperty.call(rootReducerConfig, action.type)) {
    return rootReducerConfig[action.type](state, action);
  }

  return state;
}
