import * as ac from '../../app/actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

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
});

describe('Action Creators: Async - ', () => {
  describe('submitSearchForm - ', () => {
    beforeEach(() => {
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    xit('It should test some stuff', () => {
      const endpoint = endpoints.getCustomerInfo();
      const response = { foo: 'bar', id: 'jyncos' };
      const store = mockStore({});

      jasmine.Ajax.stubRequest(endpoint).andReturn({
        status: 200,
        responseText: JSON.stringify({ response })
      });

      store.dispatch(ac.getCustomerData(tokens));

      expect(store.getActions()).toEqual([
        { type: ac.SET_CUSTOMER_DATA, customerData: response }
      ]);
    });
  });
});
