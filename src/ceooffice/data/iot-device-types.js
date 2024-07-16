const sensorTypes = {
  humidity: {
    unit: '%',
    range: [0, 100],
  },
  temperature: {
    unit: '°C',
    range: [-30, 50],
  },
  pressure: {
    unit: 'hPa',
    range: [950, 1050],
  },
}

export default sensorTypes
