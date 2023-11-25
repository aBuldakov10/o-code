import React, { useState, useEffect } from 'react';

const useLocationCoord = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords, timestamp }) => {
          const { latitude, longitude } = coords;

          setUserLocation({ latitude, longitude });
        },
        (error) => setError('Геолокация пользваотеля отключена')
      );
    } else {
      setError('Геолокация не поддерживается браузером');
    }
  }, []);

  return { ...userLocation, error };
};

export default useLocationCoord;
