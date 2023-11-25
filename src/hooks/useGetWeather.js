import { useState } from 'react';
import { fetchWeather } from '../components/App/api';

const useGetWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async (lat, lon) => {
    if (lat && lon) {
      const weatherData = await fetchWeather(lat, lon);

      setWeatherData(weatherData);
    }
  };

  return [weatherData, getWeather];
};

export default useGetWeather;
