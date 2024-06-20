const statusFeatures = {
    humidity: {
      name: 'Humidity',
      unit: '%',
      min: 0,
      max: 100,
      warn: { high: 80 }, // Warn if humidity exceeds 80%
    },
    temperature: {
      name: 'Temperature',
      unit: '°C',
      min: -30,
      max: 50,
      warn: { high: 35, low: -10 }, // Warn if temperature exceeds 35°C or drops below -10°C
    },
    pressure: {
      name: 'Pressure',
      unit: 'hPa',
      min: 800,
      max: 1100,
      warn: { low: 850, high: 1050 }, // Warn if pressure is below 850 hPa or above 1050 hPa
    },
  }
  
export default statusFeatures
  