import { useState } from 'react';
import { fetchWeatherWeek } from '../components/App/api';

const useGetWeatherWeek = () => {
  const [weatherWeekData, setWeatherWeekData] = useState(null);

  const newWeatherWeekData = {};
  const newWeatherWeekList = [];

  let weekListFlag = new Date().getDate().toString(); // current day
  let indexFlag = 0; // weather data list index

  const getWeatherWeek = async (lat, lon) => {
    if (lat && lon) {
      const weatherData = await fetchWeatherWeek(lat, lon);

      // sort list for noon and midnight
      const filtered = weatherData.list.filter((item) => {
        const itemDay = item.dt_txt.split(' ')[0].split('-')[2];
        const itemTime = item.dt_txt.split(' ')[1];

        if (weekListFlag !== itemDay) return itemTime === '00:00:00' || itemTime === '12:00:00';
      });

      // create new week weather list
      filtered.forEach((item) => {
        const itemTime = item.dt_txt.split(' ')[1];

        if (itemTime === '00:00:00') {
          const nightData = {
            id: indexFlag,
            dt: item.dt,
            weather: item.weather,
            temp_day: item.main.temp,
            temp_night: item.main.temp,
            wind: item.wind,
          };

          newWeatherWeekList.push(nightData);
        }

        if (itemTime === '12:00:00') {
          const dayData = {
            dt: item.dt,
            weather: item.weather,
            temp_day: item.main.temp,
            wind: item.wind,
          };

          newWeatherWeekList[indexFlag] = { ...newWeatherWeekList[indexFlag], ...dayData };

          indexFlag++;
        }
      });

      newWeatherWeekData['city'] = weatherData.city;
      newWeatherWeekData['list'] = newWeatherWeekList;

      setWeatherWeekData(newWeatherWeekData);
    }
  };

  return [weatherWeekData, getWeatherWeek];
};

export default useGetWeatherWeek;
