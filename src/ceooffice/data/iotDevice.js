const fs = require('fs')

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

const iotDevices = [
  {
    id: 1,
    location: { latitude: 41.0082, longitude: 28.9784 },
    sensors: [, 'pressure'],
  },
  { id: 2, location: { latitude: 38.4192, longitude: 27.1287 }, sensors: ['temperature'] },
  {
    id: 3,
    location: { latitude: 38.4237, longitude: 27.1428 },
    sensors: ['humidity', 'temperature', 'pressure'],
  },
  { id: 4, location: { latitude: 38.4325, longitude: 27.1418 }, sensors: ['humidity', 'pressure'] },
  {
    id: 5,
    location: { latitude: 38.4312, longitude: 27.1429 },
    sensors: ['temperature', 'pressure'],
  },
  {
    id: 6,
    location: { latitude: 38.4096, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 7, location: { latitude: 38.4041, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 8,
    location: { latitude: 38.4215, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 9, location: { latitude: 38.4424, longitude: 27.1434 }, sensors: ['pressure', 'humidity'] },
  {
    id: 10,
    location: { latitude: 38.4111, longitude: 27.1287 },
    sensors: ['temperature', 'pressure'],
  },
  { id: 11, location: { latitude: 38.4119, longitude: 27.1287 }, sensors: ['humidity'] },
  { id: 12, location: { latitude: 38.4129, longitude: 27.1287 }, sensors: ['temperature'] },
  {
    id: 13,
    location: { latitude: 38.4199, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 14, location: { latitude: 38.4189, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 15,
    location: { latitude: 38.4195, longitude: 27.1287 },
    sensors: ['temperature'],
  },
  {
    id: 16,
    location: { latitude: 38.4203, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  {
    id: 17,
    location: { latitude: 38.4121, longitude: 27.1287 },
    sensors: ['pressure', 'humidity'],
  },
  { id: 18, location: { latitude: 38.4131, longitude: 27.1287 }, sensors: ['temperature'] },
  { id: 19, location: { latitude: 38.4114, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 20,
    location: { latitude: 38.4122, longitude: 27.1287 },
    sensors: ['temperature', 'humidity'],
  },
  { id: 21, location: { latitude: 38.4134, longitude: 27.1287 }, sensors: ['temperature'] },
  {
    id: 22,
    location: { latitude: 38.4146, longitude: 27.1287 },
    sensors: ['pressure', 'temperature'],
  },
  { id: 23, location: { latitude: 38.4162, longitude: 27.1287 }, sensors: ['humidity'] },
  {
    id: 24,
    location: { latitude: 38.4141, longitude: 27.1287 },
    sensors: ['pressure', 'temperature'],
  },
  { id: 25, location: { latitude: 38.4152, longitude: 27.1287 }, sensors: ['humidity'] },
  {
    id: 26,
    location: { latitude: 38.4172, longitude: 27.1287 },
    sensors: ['pressure', 'humidity', 'temperature'],
  },
  { id: 27, location: { latitude: 38.4149, longitude: 27.1287 }, sensors: ['temperature'] },
  { id: 28, location: { latitude: 38.4159, longitude: 31.1287 }, sensors: ['pressure'] },
  {
    id: 29,
    location: { latitude: 38.4143, longitude: 29.1287 },
    sensors: ['temperature', 'humidity'],
  },
  {
    id: 30,
    location: { latitude: 38.4168, longitude: 27.1287 },
    sensors: ['pressure', 'temperature'],
  },
  {
    id: 31,
    location: { latitude: 38.4184, longitude: 26.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 32, location: { latitude: 38.418, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 33,
    location: { latitude: 38.4173, longitude: 28.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 34, location: { latitude: 38.4158, longitude: 27.1287 }, sensors: ['temperature'] },
  { id: 35, location: { latitude: 38.4163, longitude: 27.4 }, sensors: ['humidity'] },
  {
    id: 36,
    location: { latitude: 38.4148, longitude: 27.1287 },
    sensors: ['pressure', 'temperature'],
  },
  { id: 37, location: { latitude: 38.4139, longitude: 27.1287 }, sensors: ['humidity'] },
  {
    id: 38,
    location: { latitude: 38.4164, longitude: 27.3 },
    sensors: ['pressure', 'temperature'],
  },
  {
    id: 39,
    location: { latitude: 38.4186, longitude: 27.1287 },
    sensors: ['humidity', 'pressure'],
  },
  { id: 40, location: { latitude: 38.4191, longitude: 27.1287 }, sensors: ['temperature'] },
  { id: 41, location: { latitude: 38.4167, longitude: 27.2012 }, sensors: ['pressure'] },
  {
    id: 42,
    location: { latitude: 38.4187, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 43, location: { latitude: 38.4157, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 44,
    location: { latitude: 38.4165, longitude: 27.1287 },
    sensors: ['humidity', 'temperature'],
  },
  { id: 45, location: { latitude: 38.4178, longitude: 27.1287 }, sensors: ['pressure'] },
  {
    id: 46,
    location: { latitude: 38.4171, longitude: 27.1287 },
    sensors: ['temperature', 'humidity'],
  },
  { id: 47, location: { latitude: 38.4145, longitude: 32.1287 }, sensors: ['pressure'] },
  {
    id: 48,
    location: { latitude: 38.4193, longitude: 32.1207 },
    sensors: ['humidity'],
  },
  {
    id: 49,
    location: { latitude: 39.4188, longitude: 27.1287 },
    sensors: ['pressure', 'temperature'],
  },
  { id: 50, location: { latitude: 37.4197, longitude: 27.1287 }, sensors: ['humidity'] },
]

const deviceImages = [
  'src/assets/images/iotpictures/i.webp',
  'src/assets/images/iotpictures/i (1).webp',
  'src/assets/images/iotpictures/i (2).webp',
  'src/assets/images/iotpictures/i (3).webp',
  'src/assets/images/iotpictures/i (4).webp',
]

const generateRandomNumber = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1)
}

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

const generateDeviceData = (deviceNumber = 50) => {
  const startDate = new Date('2024-05-12T00:00:00')
  const dateRange = generateDateRange(startDate, 7)

  const iotDeviceMeasurements = []
  iotDevices.forEach((device) => {
    const { id, location, sensors } = device
    for (const date of dateRange) {
      const sensorsData = {}

      sensors.forEach((sensorType) => {
        const { range } = sensorTypes[sensorType]
        sensorsData[sensorType] = generateRandomNumber(range[0], range[1])
      })

      // Generate a random image path for each device
      const randomImageIndex = Math.floor(Math.random() * deviceImages.length)
      const randomImagePath = deviceImages[randomImageIndex]

      iotDeviceMeasurements.push({
        id: id,
        name: `Device ${id}`,
        location: location,
        sensorsData: sensorsData,
        imagePath: randomImagePath, // Assign random image path to each device
        timestamp: date.toISOString(), // Add timestamp to each device
      })
    }
  })

  // Write to JSON files
  fs.writeFileSync('devices.json', JSON.stringify(iotDeviceMeasurements, null, 2), 'utf-8')

  console.log('Data has been generated and written to devices.json')
}

generateDeviceData()
