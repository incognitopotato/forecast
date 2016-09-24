import 'jasmine-ajax';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import getForecastEndpoint from '../../app/utils/endpoints';
import * as ac from '../../app/actions';
import { views as v } from '../../app/utils/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Action Creators: Pure - ', () => {
  it('It should test updateView', () => {
    expect(ac.updateView('foo', 'bar')).toEqual({
      type: ac.UPDATE_VIEW,
      data: {
        area: 'foo',
        view: 'bar'
      }
    });
  });

  it('It should test updateZipcode', () => {
    expect(ac.updateZipcode('11111')).toEqual({
      type: ac.UPDATE_ZIPCODE,
      data: {
        zipcode: '11111'
      }
    });
  });

  it('It should test updateCity', () => {
    expect(ac.updateCity('Brooklyn')).toEqual({
      type: ac.UPDATE_CITY,
      data: {
        city: 'Brooklyn'
      }
    });
  });

  it('It should test updateForecast', () => {
    expect(ac.updateForecast({ foo: 'bar' })).toEqual({
      type: ac.UPDATE_FORECAST,
      data: {
        forecast: { foo: 'bar' }
      }
    });
  });
});

describe('Action Creators: Async - ', () => {
  describe('submitSearchForm - ', () => {
    beforeEach(() => {
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('It should test submitSearchForm', () => {
      const zipcode = 12345;
      const city = { name: 'Foolyn' };
      const forecast = [1, 2, 3];
      const endpoint = getForecastEndpoint(zipcode);
      const response = {
        city,
        list: forecast
      };
      const store = mockStore({});

      jasmine.Ajax.stubRequest(endpoint).andReturn({
        status: 200,
        responseText: JSON.stringify(response)
      });

      store.dispatch(ac.submitSearchForm(zipcode));

      expect(store.getActions()).toEqual([
        ac.updateZipcode(zipcode),
        ac.updateCity(city),
        ac.updateForecast(forecast),
        ac.updateView(v.MAIN_AREA, v.MAIN_FORECAST_VIEW)
      ]);
    });
  });
});
