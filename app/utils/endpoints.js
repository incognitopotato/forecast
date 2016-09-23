const apiKey = '022d192c9ef1004ac32e51c231ee7ef5';

export default function getForecastEndpoint(zipcode, key = apiKey) {
  return `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&mode=json&units=imperial&cnt=5&appid=${key}`;
}
