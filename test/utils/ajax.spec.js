import 'jasmine-ajax';
import { doRequest } from '../../app/utils/ajax';

describe('Utils: Ajax - ', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('Request helper', () => {
    it('It should call the success handler on 2xx response', () => {
      const url = 'http://example.com/good-resource';
      const success = jasmine.createSpy('success');
      const failure = jasmine.createSpy('failure');

      jasmine.Ajax.stubRequest(url).andReturn({
        status: 200
      });

      doRequest({
        data: { },
        failure,
        method: 'GET',
        success,
        url
      });

      jasmine.Ajax.requests.mostRecent();

      expect(success).toHaveBeenCalled();
      expect(failure.calls.any()).toBe(false);
    });

    it('It should call the failure handler on 4xx error', () => {
      const url = 'http://example.com/missing-resource';
      const success = jasmine.createSpy('success');
      const failure = jasmine.createSpy('failure');

      jasmine.Ajax.stubRequest(url).andReturn({
        status: 404
      });

      doRequest({
        data: { },
        failure,
        method: 'POST',
        success,
        url
      });

      jasmine.Ajax.requests.mostRecent();
      expect(failure).toHaveBeenCalled();
      expect(success.calls.any()).toBe(false);
    });

    it('It should call the failure handler on 5xx error', () => {
      const url = 'http://example.com/fatal-resource';
      const success = jasmine.createSpy('success');
      const failure = jasmine.createSpy('failure');

      jasmine.Ajax.stubRequest(url).andReturn({
        status: 500
      });

      doRequest({
        data: { },
        failure,
        method: 'POST',
        success,
        url
      });

      jasmine.Ajax.requests.mostRecent();

      expect(failure).toHaveBeenCalled();
      expect(success.calls.any()).toBe(false);
    });
  });
});
