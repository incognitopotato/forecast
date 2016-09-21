import { views } from '../utils/constants'

// Pure Action Creators
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE';
export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';

export const updateView = (area, view) => ({
  type: UPDATE_VIEW,
  data: {
    area,
    view
  }
});

export const updateZipcode = (zipcode) => ({
  type: UPDATE_ZIPCODE,
  data: {
    zipcode
  }
});

export function submitSearchForm(zipcode){
  return (dispatch, getState) => {
    dispatch(updateZipcode(zipcode));
  };
}