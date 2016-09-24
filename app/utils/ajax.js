/* eslint-disable*/
import { noop } from './noop';

const defaults = {
  data: null,
  failure: noop,
  headers: {},
  method: 'GET',
  success: noop,
  url: window.location.toString()
};

const sessionTimeout = {
  timer: {
    restart: noop
  }
};

export function doRequest(config, withCredentials = false, responseType = '') {
  const opts = Object.assign({}, defaults, config);
  const { method, url, headers, data, success, failure } = opts;
  const request = new window.XMLHttpRequest();

  if (headers && headers.Authorization === null) {
    return;
  }

  try {
    request.open(method, url, true);
  } catch (e) {
    console.error(e); // eslint-disable-line
    return;
  }

  request.withCredentials = withCredentials;

  if (responseType) {
    request.responseType = responseType;
  }

  if (headers) {
    for (const k in headers) {
      if (headers.hasOwnProperty(k)) {
        request.setRequestHeader(k, headers[k]);
      }
    }
  }

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      sessionTimeout.timer.restart(sessionTimeout.delay);
      success(request.responseText, request);
    } else {
      request.onerror();
    }
  };

  request.onerror = () => {
    if (request.readyState === 4 && request.status === 0) {
      console.error('Network connectivity issue. There is no error response to process.')
      return;
    }

    const errorHandlers = {
      404: 'notFound',
      405: 'error', // Method Not Allowed
      406: 'error', // Not Acceptable
      411: 'error', // Length Required
      429: 'error', // Too Many Requests
      431: 'error', // Request Header Too Large
      500: 'error', // Server Internal Error
      501: 'error', // Not Implemented
      502: 'error', // Bad Gateway
      503: 'error', // Service Unavailable
      504: 'error', // Gateway Timeout
      505: 'error' // HTTP Version Not Supported
    };

    failure(request);
  };

  request.send(data);
}

export function postJSON(
  url,
  data,
  headers,
  success = noop,
  failure = noop,
  withCredentials = false,
  exclusions = []
) {
  const successHandler = (responseData, r) => {
    success(JSON.parse(responseData), r);
  };

  doRequest({
    data: JSON.stringify(data),
    failure,
    headers: { ...headers, 'Content-Type': 'application/json' },
    method: 'POST',
    success: successHandler,
    url
  }, withCredentials, '', exclusions);
}

export function putJSON(url, data, headers, success = noop, failure = noop,
                        withCredentials = false) {
  const successHandler = (responseData, r) => {
    success(JSON.parse(responseData), r);
  };

  doRequest({
    data: JSON.stringify(data),
    failure,
    headers: { ...headers, 'Content-Type': 'application/json' },
    method: 'PUT',
    success: successHandler,
    url
  }, withCredentials);
}

export function getJSON(url, headers, success = noop, failure = noop, withCredentials = false) {
  const successHandler = (responseData, r) => {
    success(JSON.parse(responseData), r);
  };

  doRequest({
    data: {},
    failure,
    headers: { ...headers },
    method: 'GET',
    success: successHandler,
    url
  }, withCredentials);
}
