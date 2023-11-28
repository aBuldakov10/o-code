import React, { useContext, useState } from 'react';

// Files
import './ChangeLocationPopup.scss';
import { fetchLocations } from '../App/api';

// Components
import CloseIcon from '../Icons/CloseIcon';

// Context
import { PopupContext } from '../App/App';

const ChangeLocationPopup = () => {
  const { setChangeLocationPopup, getWeather, getWeatherWeek } = useContext(PopupContext);

  const [locationsData, setLocationsData] = useState([]); // geolocation list

  /*** Handlers ***/
  const handleSearchLocation = async (loc) => await fetchLocations(loc).then((data) => setLocationsData(data));
  const handleClosePopup = () => setChangeLocationPopup(false);
  const handleChooseLocation = (lat, lon) => {
    getWeather(lat, lon);
    getWeatherWeek(lat, lon);

    handleClosePopup();
  };

  return (
    <div className={`popup-wrapper ${setChangeLocationPopup ? 'is-open' : ''}`}>
      <div className="popup">
        <div className="popup__content">
          {/*** Title ***/}
          <div className="popup__title">
            Выберите населенный пункт
            <div className="popup__close" onClick={handleClosePopup}>
              <CloseIcon />
            </div>
          </div>

          {/*** Content ***/}
          <div className="popup__body">
            <input
              className="input"
              type="text"
              onChange={(e) => handleSearchLocation(e.target.value)}
              placeholder="Введите название пункта"
            />

            {/*** Geolocation list ***/}
            {locationsData.length > 0 && (
              <ul className="location-list">
                {locationsData.map(({ country, state, name, lat, lon }, index) => {
                  return (
                    <li className="location-list__item" key={index} onClick={() => handleChooseLocation(lat, lon)}>
                      {country}, {state}, {name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLocationPopup;
