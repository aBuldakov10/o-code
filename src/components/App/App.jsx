import { useEffect } from 'react';

// Files
import './App.scss';

// Components
import useLocationCoord from '../../hooks/useLocationCoord';
import useGetWeather from '../../hooks/useGetWeather';

const App = () => {
  const { latitude, longitude, error } = useLocationCoord(); // get location coord
  const [weatherData, getWeather] = useGetWeather(); // weather data, get weather callback

  useEffect(() => {
    getWeather(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div className="weather">
      <div className="weather__day">
        <div>{latitude && longitude ? `latitude: ${latitude}, longitude: ${longitude}` : `error: ${error}`}</div>

        <button
          onClick={() => {
            getWeather(39.907501, 116.397232);
          }}
        >
          other
        </button>
      </div>

      <div className="location-info">
        <div>Текущее местоположение:</div>
        <div>Страна</div>
        <div>{weatherData?.name}</div>
        <div>Координаты</div>
        <div>Время</div>
        <button className="btn">Изменить</button>
      </div>

      <div className="weather__week">weather week</div>
    </div>
  );
};

export default App;
