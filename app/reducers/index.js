import { createReducer } from 'redux-create-reducer';
import { views } from '../utils/constants'
import * as ac from '../actions';

const initialState = {
  view: {
    main: views.MAIN_SEARCH_VIEW,
    header: views.HEADER_DEFAULT_VIEW
  },
  zipcode: null,
  weatherData: null
};

const rootReducerConfig = {
  [ac.UPDATE_ZIPCODE]: (state, { data }) => {
    return {
      ...state,
      ...data
    };
  },

  [ac.UPDATE_VIEW]: (state, { data }) => {
    switch(data.area) {
      case views.HEADER_AREA:
          return {
            ...state,
            view: {
              ...state.view,
              header: data.view
            }
          };
        break;

      case views.MAIN_AREA:
          return {
            ...state,
            view: {
              ...state.view,
              main: data.view
            }
          };
        break;

      default:
        console.warn(`HEY!  ${data.area} is not a valid view area.  Use HEADER_AREA or MAIN_AREA constants.`);
        return state;
    }
  },

  [ac.UPDATE_WEATHER_DATA]: (state, { data }) => {
    return {
      ...state,
      weatherData: {
        ...state.weatherData,
        ...data
      }
    };
  }
};

export default function rootReducer(state = initialState, action) {
  if (rootReducerConfig.hasOwnProperty(action.type)) {
    return rootReducerConfig[action.type](state, action);
  }

  return state;
}