import fetch from 'isomorphic-fetch';
import getForecastEndpoint from '../utils/endpoints';
import { views as v } from '../utils/constants';

// Pure Action Creators
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE';
export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_CITY = 'UPDATE_CITY';

export const updateView = (area, view) => ({
  type: UPDATE_VIEW,
  data: {
    area,
    view
  }
});

export const updateZipcode = zipcode => ({
  type: UPDATE_ZIPCODE,
  data: {
    zipcode
  }
});

export const updateForecast = forecast => ({
  type: UPDATE_FORECAST,
  data: {
    forecast
  }
});

export const updateCity = city => ({
  type: UPDATE_CITY,
  data: {
    city
  }
});

export function submitSearchForm(zipcode) {
  return (dispatch) => {
    const endpoint = getForecastEndpoint(zipcode);
    dispatch(updateZipcode(zipcode));

    fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: Your API call returned an error status ${response.statusCode}`);
      }
      return response.json();
    })
    .then((body) => {
      dispatch(updateCity(body.city));
      dispatch(updateForecast(body.list));
      dispatch(updateView(v.MAIN_AREA, v.MAIN_FORECAST_VIEW));
    });
  };
}
