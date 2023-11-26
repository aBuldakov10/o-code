import React, { useEffect } from 'react';

// Files
import './App.scss';
import { weatherIconUrl } from './api';
import { convertTime, convertDate, convertWindDirection } from './index';

// Components
import useLocationCoord from '../../hooks/useLocationCoord';
import useGetWeather from '../../hooks/useGetWeather';
import TemperatureIcon from '../Icons/TemperatureIcon';
import WindIcon from '../Icons/WindIcon';
import BarometerIcon from '../Icons/BarometerIcon';

const App = () => {
  const { latitude, longitude, error } = useLocationCoord(); // get location coord
  const [weatherData, getWeather] = useGetWeather(); // weather data, get weather callback

  useEffect(() => {
    getWeather(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div className="weather-wrapper">
      <div className="container">
        <div className="weather">
          {/*** Location info ***/}
          <div className="location-info">
            <div className="location-info__item country">{weatherData?.sys.country},</div>
            <div className="location-info__item city">{weatherData?.name}</div>

            <div className="location-info__item coords">
              <span>{weatherData?.coord.lat}</span>
              <span>{weatherData?.coord.lon}</span>
            </div>

            <div className="location-info__item data-time">{convertTime(weatherData?.dt)}</div>

            <button
              className="btn"
              onClick={() => {
                getWeather(39.907501, 116.397232);
              }}
            >
              Изменить
            </button>
          </div>

          {/*** Weather info ***/}
          <div className="weather__day">
            <div className="weather__day-item weather__day-date">{convertDate(weatherData?.dt)}</div>
            <div className="weather__day-item weather__day-desc">{weatherData?.weather[0].description}</div>

            <div className="weather__day-item weather__day-img">
              <img
                src={`${weatherIconUrl}/wn/${weatherData?.weather[0].icon}@2x.png`}
                alt="weather-icon"
                title={weatherData?.weather[0].description}
              />
            </div>

            <div className="weather__day-item weather__day-temp">
              <div className="temp-icon">
                <TemperatureIcon />
              </div>

              <div>За окном {Math.round(weatherData?.main.temp)} &#8451;</div>
              <div>Ощущается как {Math.round(weatherData?.main.feels_like)} &#8451;</div>
            </div>

            <div className="weather__day-item weather__day-pressure">
              <div className="pressure-icon">
                <BarometerIcon />
              </div>

              <div>Давление {Math.round(weatherData?.main.pressure / 1.333)} мм. рт. ст.</div>
            </div>

            <div className="weather__day-item weather__day-wind">
              <div className="wind-icon">
                <WindIcon />
              </div>

              <div>
                Ветер: {convertWindDirection(weatherData?.wind.deg)} {weatherData?.wind.speed} м/с
              </div>
            </div>

            <i className="weather__day-details">Нажмите для просмотра подробностей</i>
          </div>

          {/*** Weather week list ***/}
          <div className="weather__week">weather week</div>
        </div>
      </div>
    </div>
  );
};

export default App;
