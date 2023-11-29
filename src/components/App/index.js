// Get time
export const convertTime = (secondsValue) => {
  if (secondsValue) {
    const time = new Date(secondsValue * 1000);

    return time.toLocaleTimeString();
  }
};

// Get date
export const convertDate = (secondsValue) => {
  const monthList = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const time = new Date(secondsValue * 1000);

  return `${week[time.getDay()]}, ${time.getDate()} ${monthList[time.getMonth()]}`;
};

// Get wind direction
export const convertWindDirection = (windData) => {
  const windDirectionData = {
    0: 'южный',
    90: 'западный',
    180: 'северный',
    270: 'восточный',
  };

  if (windData && Object.keys(windDirectionData).includes(windData.toString())) return windDirectionData[windData];
  if (windData > 0 && windData < 90) return 'юго-западный';
  if (windData > 90 && windData < 180) return 'северо-западный';
  if (windData > 180 && windData < 270) return 'северо-восточный';
  if (windData > 270 && windData < 360) return 'юго-восточный';
};
