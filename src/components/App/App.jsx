import React, { createContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

// Files
import './App.scss';
import { weatherIconUrl } from './api';
import { convertTime, convertDate, convertWindDirection } from './index';

// Components
import TemperatureIcon from '../Icons/TemperatureIcon';
import WindIcon from '../Icons/WindIcon';
import BarometerIcon from '../Icons/BarometerIcon';

// Hooks
import useLocationCoord from '../../hooks/useLocationCoord';
import useGetWeather from '../../hooks/useGetWeather';
import useGetWeatherWeek from '../../hooks/useGetWeatherWeek';
import useMedia from '../../hooks/useMedia';
import ChangeLocationPopup from '../ChangeLocationPopup/ChangeLocationPopup';

// Context
export const PopupContext = createContext({}); // контекст отзывов занятия

const App = () => {
  const weatherItem = useRef(null);
  const { latitude, longitude, error } = useLocationCoord(); // get location coord
  const [weatherData, getWeather] = useGetWeather(); // weather data, get weather callback
  const [weatherWeekData, getWeatherWeek] = useGetWeatherWeek(); // weather data, get weather callback
  const mob = useMedia('(max-width: 575px)');
  const desk = useMedia('(min-width: 992px)');

  const tab = !mob && !desk;
  let sliderCount = 1;

  const [translateSlider, setTranslateSlider] = useState(0);
  const [weatherItemWidth, setWeatherItemWidth] = useState(0);
  const [changeLocationPopup, setChangeLocationPopup] = useState(false); // popup state

  useEffect(() => {
    getWeather(latitude, longitude);
    getWeatherWeek(latitude, longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    setWeatherItemWidth(weatherItem.current?.offsetWidth + 20);
  }, [weatherWeekData]);

  /*** Handlers ***/
  const handlePrev = () => {
    setTranslateSlider((prevState) => {
      if (prevState <= 0) return 0;

      return prevState - weatherItemWidth;
    });
  };
  const handleNext = () => {
    if (tab) sliderCount = 2;
    if (desk) sliderCount = 3;

    // // ширина скрытых elem
    const lengthHidden = (weatherWeekData && Object.values(weatherWeekData)[1].length - sliderCount) * weatherItemWidth;

    setTranslateSlider((prevState) => {
      if (lengthHidden < prevState + weatherItemWidth) return prevState;

      return prevState + weatherItemWidth;
    });
  };
  const handleOpenPopup = () => setChangeLocationPopup(true);

  return (
    <PopupContext.Provider value={{ setChangeLocationPopup, getWeather, getWeatherWeek }}>
      <div className={`weather-wrapper ${changeLocationPopup ? 'blur' : ''}`}>
        <div className="container">
          <div className="weather">
            {/*** Location info ***/}
            <CSSTransition in={!!weatherData} classNames="alert" timeout={300} unmountOnExit>
              <div className="location-info">
                <div className="location-info__item country">{weatherData?.sys.country},</div>
                <div className="location-info__item city">{weatherData?.name}</div>

                <div className="location-info__item coords">
                  <span>{weatherData?.coord.lat}</span>
                  <span>{weatherData?.coord.lon}</span>
                </div>

                <div className="location-info__item data-time">{convertTime(weatherData?.dt)}</div>

                <button className="btn" onClick={handleOpenPopup}>
                  Изменить
                </button>
              </div>
            </CSSTransition>

            {/*** Weather info ***/}
            <CSSTransition in={!!weatherData} classNames="alert" timeout={300} unmountOnExit>
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
            </CSSTransition>

            {/*** Weather week list ***/}
            <CSSTransition in={!!weatherWeekData} classNames="alert" timeout={300} unmountOnExit>
              <>
                <div className="weather__week">
                  <div className="weather-week-slider" style={{ transform: `translateX(-${translateSlider}px)` }}>
                    {weatherWeekData &&
                      Object.values(weatherWeekData)[1].map((item) => {
                        return (
                          <div className="weather-week-slider__item" ref={weatherItem} key={item.id}>
                            <div className="weather__day-item weather__day-date">{convertDate(item?.dt)}</div>
                            <div className="weather__day-item weather__day-desc">{item?.weather[0].description}</div>

                            <div className="weather__day-item weather__day-img">
                              <img
                                src={`${weatherIconUrl}/wn/${item?.weather[0].icon}@2x.png`}
                                alt="weather-icon"
                                title={item?.weather[0].description}
                              />
                            </div>

                            <div className="weather-week-slider__day">Днем {Math.round(item?.temp_day)} &#8451;</div>
                            <div className="weather-week-slider__night">
                              Ночью {Math.round(item?.temp_night)} &#8451;
                            </div>
                            <div className="weather-week-slider__wind">
                              Ветер: {convertWindDirection(item?.wind.deg)} {item?.wind.speed} м/с
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="action">
                  <button className="btn btn--bg" onClick={handlePrev}>
                    prev
                  </button>

                  <button className="btn btn--bg" onClick={handleNext}>
                    next
                  </button>
                </div>
              </>
            </CSSTransition>
          </div>
        </div>
      </div>

      {/*** Change location popup ***/}
      <CSSTransition in={changeLocationPopup} classNames="alert" timeout={300} unmountOnExit>
        <ChangeLocationPopup />
      </CSSTransition>
    </PopupContext.Provider>
  );
};

export default App;
