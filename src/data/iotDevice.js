const deviceImages = [
    'src/assets/images/iotpictures/i.webp',
    'src/assets/images/iotpictures/i (1).webp',
    'src/assets/images/iotpictures/i (2).webp',
    'src/assets/images/iotpictures/i (3).webp',
    'src/assets/images/iotpictures/i (4).webp',
];
  
const generateRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

const generateRandomDevices = (count) => {
    const devices = [];
    for (let i = 0; i < count; i++) {
      const supportedSensors = ['humidity', 'temperature', 'pressure']; // Example sensor types
      const sensorsData = {};
      supportedSensors.forEach(sensorType => {
        // Generate random sensor readings only for supported sensor types
        if (Math.random() < 0.5) { // 50% chance of having a measurement for each supported sensor
          sensorsData[sensorType] = generateRandomNumber(0, 100);
        }
      });
  
      // Generate a random image path for each device
      const randomImageIndex = Math.floor(Math.random() * deviceImages.length); // Assuming deviceImages is an array of image paths
      const randomImagePath = deviceImages[randomImageIndex];
  
      devices.push({
        id: i + 1,
        name: `Device ${i + 1}`,
        location: {
          latitude: generateRandomNumber(-90, 90),
          longitude: generateRandomNumber(-180, 180),
        },
        sensorsData: sensorsData,
        imagePath: randomImagePath, // Assign random image path to each device
      });
    }
    return devices;
  };

  export default generateRandomDevices(50);
  