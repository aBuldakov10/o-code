/*** Weather api variables ***/
export const apiKey = '641c47dcb8a7b9d976c1925431f690f7';
export const apiDomain = 'https://api.openweathermap.org/data/2.5';
export const apiGeoDomain = 'https://api.openweathermap.org/geo/1.0';
export const weatherIconUrl = 'https://openweathermap.org/img';

/*** Get weather data by city id ***/
export const fetchWeather = async (lat, lon) => {
  const apiRequest = `${apiDomain}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru&units=metric`;
  const response = await fetch(apiRequest);

  return await response.json();
};

/*** Get weather data by lat and lon for a week ***/
export const fetchWeatherWeek = async (lat, lon) => {
  const apiRequest = `${apiDomain}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru&units=metric`;
  const response = await fetch(apiRequest);

  return await response.json();
};

/*** Get locations by entered name ***/
export const fetchLocations = async (locationName) => {
  const apiRequest = `${apiGeoDomain}/direct?q=${locationName}&limit=5&appid=${apiKey}`;
  const response = await fetch(apiRequest);

  return await response.json();
};
