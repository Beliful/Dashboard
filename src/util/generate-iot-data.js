const fs = require('fs')

const iotDevices = [
  { id: 1, location: { lat: 35.6895, lon: 139.6917 }, owner: 'Alice' },
  { id: 2, location: { lat: 51.5074, lon: -0.1278 }, owner: 'Bob' },
  { id: 3, location: { lat: 40.7128, lon: -74.006 }, owner: 'Charlie' },
  { id: 4, location: { lat: 34.0522, lon: -118.2437 }, owner: 'David' },
  { id: 5, location: { lat: 48.8566, lon: 2.3522 }, owner: 'Eva' },
  { id: 6, location: { lat: 55.7558, lon: 37.6173 }, owner: 'Fiona' },
  { id: 7, location: { lat: 39.9042, lon: 116.4074 }, owner: 'George' },
  { id: 8, location: { lat: -33.8688, lon: 151.2093 }, owner: 'Hannah' },
  { id: 9, location: { lat: 34.6937, lon: 135.5023 }, owner: 'Isaac' },
  { id: 10, location: { lat: 37.7749, lon: -122.4194 }, owner: 'Jane' },
  { id: 11, location: { lat: 41.8781, lon: -87.6298 }, owner: 'Kevin' },
  { id: 12, location: { lat: 52.52, lon: 13.405 }, owner: 'Laura' },
  { id: 13, location: { lat: 40.4168, lon: -3.7038 }, owner: 'Michael' },
  { id: 14, location: { lat: 19.4326, lon: -99.1332 }, owner: 'Nina' },
  { id: 15, location: { lat: 35.6762, lon: 139.6503 }, owner: 'Oliver' },
  { id: 16, location: { lat: 45.4654, lon: 9.1859 }, owner: 'Paula' },
  { id: 17, location: { lat: 43.6532, lon: -79.3832 }, owner: 'Quinn' },
  { id: 18, location: { lat: -23.5505, lon: -46.6333 }, owner: 'Rachel' },
  { id: 19, location: { lat: 37.5665, lon: 126.978 }, owner: 'Sam' },
  { id: 20, location: { lat: 30.0444, lon: 31.2357 }, owner: 'Tina' },
  { id: 21, location: { lat: 59.3293, lon: 18.0686 }, owner: 'Ursula' },
  { id: 22, location: { lat: 35.6895, lon: 139.6917 }, owner: 'Victor' },
  { id: 23, location: { lat: 40.7128, lon: -74.006 }, owner: 'Wendy' },
  { id: 24, location: { lat: -33.8688, lon: 151.2093 }, owner: 'Xander' },
  { id: 25, location: { lat: 34.6937, lon: 135.5023 }, owner: 'Yara' },
]

const generateMeasurements = () => ({
  temperature: (Math.random() * 15 + 15).toFixed(1), // 15°C to 30°C
  humidity: (Math.random() * 40 + 40).toFixed(1), // 40% to 80%
  pressure: (Math.random() * 20 + 990).toFixed(1), // 990hPa to 1010hPa
  soilHumidity: (Math.random() * 40 + 30).toFixed(1), // 30% to 70%
  windSpeed: (Math.random() * 10).toFixed(1), // 0 to 10 m/s
  windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
  lightIntensity: (Math.random() * 2000 + 500).toFixed(1), // 500 to 2500 lux
  rainFall: (Math.random() * 20).toFixed(1), // 0 to 20 mm
  nutritionLevel: {
    nitrogen: (Math.random() * 10 + 10).toFixed(1), // 10 to 20 units
    potassium: (Math.random() * 10 + 10).toFixed(1), // 10 to 20 units
    phosphorus: (Math.random() * 10 + 10).toFixed(1), // 10 to 20 units
  },
})

const generateDateRange = (startDate, days) => {
  const dates = []
  for (let i = 0; i < days; i++) {
    for (let hour = 0; hour < 24; hour++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      date.setHours(hour, 0, 0, 0)
      dates.push(date)
    }
  }
  return dates
}

const generateData = () => {
  const startDate = new Date('2024-05-12T00:00:00')
  const dateRange = generateDateRange(startDate, 7)

  const tractorMeasurements = []
  for (let tractorId = 1; tractorId <= 5; tractorId++) {
    for (const date of dateRange) {
      tractorMeasurements.push({
        tractorId,
        deviceId: tractorId, // Assuming each tractor has one device
        timestamp: date.toISOString(),
        measurements: generateMeasurements(),
      })
    }
  }

  // Write to JSON files
  fs.writeFileSync('iotDeviceData.json', JSON.stringify(iotDevices, null, 2))
  fs.writeFileSync('tractorMeasurements.json', JSON.stringify(tractorMeasurements, null, 2))

  console.log('Data written to iotDeviceData.json and tractorMeasurements.json')
}

generateData()
