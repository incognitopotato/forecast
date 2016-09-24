import { default as reducer } from '../../app/reducers';
import * as ac from '../../app/actions';
import { views as v } from '../../app/utils/constants';

const initialState = {
  view: {
    main: v.MAIN_SEARCH_VIEW,
    header: v.HEADER_DEFAULT_VIEW
  },
  zipcode: null,
  forecast: null,
  city: null
};

describe('Reducers - ', () => {
  it('It should return an initial state if the state is undefined', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState
    });
  });

  it('It should update the app state with zipcode', () => {
    const zipcode = '11111';

    expect(reducer(initialState, ac.updateZipcode(zipcode))).toEqual({
      ...initialState,
      zipcode
    });
  });

  it('It should update the main view property', () => {
    const area = v.MAIN_AREA;
    const view = v.MAIN_FORECAST_VIEW;

    expect(reducer(initialState, ac.updateView(area, view))).toEqual({
      ...initialState,
      view: {
        ...initialState.view,
        main: v.MAIN_FORECAST_VIEW
      }
    });
  });

  it('It should update the header view property', () => {
    const area = v.HEADER_AREA;
    const view = v.HEADER_SEARCH_VIEW;

    expect(reducer(initialState, ac.updateView(area, view))).toEqual({
      ...initialState,
      view: {
        ...initialState.view,
        header: v.HEADER_SEARCH_VIEW
      }
    });
  });
});
