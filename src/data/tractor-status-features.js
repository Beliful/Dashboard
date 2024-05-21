const statusFeatures = {
  speed: { name: "Speed", unit: "km/h", min: 0, max: 150 },
  rpm: { name: "RPM", unit: "RPM", min: 0, max: 7000 },
  fuelConsumption: { name: "Fuel Consumption", unit: "L/h", min: 0, max: 50 },
  tirePressure: {
    name: "Tire Pressure",
    unit: "PSI",
    min: 20,
    max: 45,
    subFeatures: {
      frontLeft: { name: "Front Left", min: 20, max: 45 },
      frontRight: { name: "Front Right", min: 20, max: 45 },
      rearLeft: { name: "Rear Left", min: 20, max: 45 },
      rearRight: { name: "Rear Right", min: 20, max: 45 }
    }
  },
  fuelLevel: { name: "Fuel Level", unit: "%", min: 0, max: 100 },
  engineOilLevel: { name: "Engine Oil Level", unit: "%", min: 0, max: 100 },
  engineTemperature: { name: "Engine Temperature", unit: "°C", min: 0, max: 120 }
};

export default statusFeatures;