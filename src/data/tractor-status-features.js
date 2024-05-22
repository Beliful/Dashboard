const statusFeatures = {
  speed: {
    name: 'Speed',
    unit: 'km/h',
    min: 0,
    max: 80,
    warn: { high: 55 },
  },
  rpm: {
    name: 'RPM',
    unit: 'RPM',
    min: 0,
    max: 7000,
    warn: { high: 6500 }, // Warn if RPM exceeds 6500
  },
  fuelConsumption: {
    name: 'Fuel Consumption',
    unit: 'L/h',
    min: 0,
    max: 50,
    warn: { high: 45 }, // Warn if fuel consumption exceeds 45 L/h
  },
  tirePressure: {
    name: 'Tire Pressure',
    unit: 'PSI',
    min: 20,
    max: 45,
    warn: { low: 25, high: 40 }, // Warn if pressure is below 25 or above 40 PSI
    subFeatures: {
      frontLeft: {
        name: 'Front Left',
        min: 20,
        max: 45,
        warn: { low: 25, high: 40 }, // Warn if pressure is below 25 or above 40 PSI
      },
      frontRight: {
        name: 'Front Right',
        min: 20,
        max: 45,
        warn: { low: 25, high: 40 }, // Warn if pressure is below 25 or above 40 PSI
      },
      rearLeft: {
        name: 'Rear Left',
        min: 20,
        max: 45,
        warn: { low: 25, high: 40 }, // Warn if pressure is below 25 or above 40 PSI
      },
      rearRight: {
        name: 'Rear Right',
        min: 20,
        max: 45,
        warn: { low: 25, high: 40 }, // Warn if pressure is below 25 or above 40 PSI
      },
    },
  },
  fuelLevel: {
    name: 'Fuel Level',
    unit: '%',
    min: 0,
    max: 100,
    warn: { low: 10 }, // Warn if fuel level is below 10%
  },
  engineOilLevel: {
    name: 'Engine Oil Level',
    unit: '%',
    min: 0,
    max: 100,
    warn: { low: 20 }, // Warn if engine oil level is below 20%
  },
  engineTemperature: {
    name: 'Engine Temperature',
    unit: '°C',
    min: 0,
    max: 120,
    warn: { high: 110 }, // Warn if engine temperature exceeds 110°C
  },
}

export default statusFeatures
