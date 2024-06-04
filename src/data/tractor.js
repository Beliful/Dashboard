const tractors = [
  {
    id: 1,
    owner: 'Michael Scott',
    driver: 'Jane Smith',
    model: 'New Holland TD 90 D',
    location: {
      latitude: 34.052235,
      longitude: -118.243683,
    },
    plateNumber: '34 ABC 123',
    imagePath: 'src/assets/images/tractor1.png',
    vehicleStatus: {
      speed: 30, // in km/h
      rpm: 2200,
      fuelConsumption: 12.5, // in liters per hour
      tirePressure: {
        frontLeft: 45, // in psi
        frontRight: 32,
        rearLeft: 30,
        rearRight: 30,
      },
      fuelLevel: 5, // in percentage
      engineOilLevel: 80, // in percentage
      engineTemperature: 90, // in degrees Celsius
    },
  },
  {
    id: 2,
    owner: 'Michael Scott',
    driver: 'Bob Brown',
    model: 'Case JX 55 E',
    location: {
      latitude: 40.712776,
      longitude: -74.005974,
    },
    plateNumber: '35 ABD 456',
    imagePath: 'src/assets/images/tractor2.png',
    vehicleStatus: {
      speed: 55,
      rpm: 0,
      fuelConsumption: 15.0,
      tirePressure: {
        frontLeft: 33,
        frontRight: 33,
        rearLeft: 31,
        rearRight: 31,
      },
      fuelLevel: 70,
      engineOilLevel: 85,
      engineTemperature: 92,
    },
  },
  {
    id: 3,
    owner: 'Michael Scott',
    driver: 'Dan White',
    model: 'New Holland T7.315',
    location: {
      latitude: 51.507351,
      longitude: -0.127758,
    },
    plateNumber: '06 ASD 789',
    imagePath: 'src/assets/images/tractor1.png',
    vehicleStatus: {
      speed: 50,
      rpm: 2300,
      fuelConsumption: 14.0,
      tirePressure: {
        frontLeft: 34,
        frontRight: 34,
        rearLeft: 32,
        rearRight: 32,
      },
      fuelLevel: 65,
      engineOilLevel: 78,
      engineTemperature: 88,
    },
  },
  {
    id: 4,
    owner: 'Michael Scott',
    driver: 'Emma Brown',
    model: 'New Holland TT55',
    location: {
      latitude: 48.856613,
      longitude: 2.352222,
    },
    plateNumber: '34 DEF 012',
    imagePath: 'src/assets/images/tractor1.png',
    vehicleStatus: {
      speed: 60,
      rpm: 2600,
      fuelConsumption: 16.0,
      tirePressure: {
        frontLeft: 35,
        frontRight: 35,
        rearLeft: 33,
        rearRight: 33,
      },
      fuelLevel: 75,
      engineOilLevel: 82,
      engineTemperature: 95,
    },
  },
  {
    id: 5,
    owner: 'Michael Scott',
    driver: 'Pam Beesly',
    model: 'Case JX 55 E',
    location: {
      latitude: 41.878113,
      longitude: -87.629799,
    },
    plateNumber: '35 GHI 345',
    imagePath: 'src/assets/images/tractor2.png',
    vehicleStatus: {
      speed: 48,
      rpm: 2400,
      fuelConsumption: 13.0,
      tirePressure: {
        frontLeft: 31,
        frontRight: 31,
        rearLeft: 29,
        rearRight: 29,
      },
      fuelLevel: 68,
      engineOilLevel: 79,
      engineTemperature: 89,
    },
  },
]

export default tractors
