const fs = require('fs');

// Utility function to generate a random number within a range
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

// Function to generate mock consumption data
const generateConsumptionData = () => {
  const consumptionData = [];
  const startDate = new Date('2024-07-09T00:00:00Z');
  const endDate = new Date('2024-07-15T23:00:00Z');

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const electricityUsage = getRandomNumber(1000, 1500); // kWh
    const peakUsage = getRandomNumber(100, 150); // kW
    const averageUsage = getRandomNumber(50, 100); // kWh
    const operationalHours = 1; // 1 hour

    consumptionData.push({
      timestamp: currentDate.toISOString(),
      electricityUsage: parseFloat(electricityUsage.toFixed(2)),
      operationalHours: operationalHours,
    });

    currentDate.setHours(currentDate.getHours() + 1); 
  }

  return consumptionData;
};

// Function to calculate peak and average usage
const calculatePeakAndAverage = (data) => {
  let maxUsage = 0;
  let totalUsage = 0;

  data.forEach(entry => {
    // Calculate peak usage
    if (entry.electricityUsage > maxUsage) {
      maxUsage = entry.electricityUsage;
    }

    // Accumulate total usage for average calculation
    totalUsage += entry.electricityUsage;
  });

  // Calculate average usage
  const averageUsage = totalUsage / data.length;

  return {
    peakUsage: maxUsage,
    averageUsage: averageUsage
  };
};

// Function to generate mock bill data
const generateBillData = () => {
  const billAmount = getRandomNumber(10000, 15000); // USD
  const dueDate = new Date('2024-08-01').toISOString();
  const paymentStatus = Math.random() > 0.5 ? 'Paid' : 'Unpaid';
  const paymentDate = paymentStatus === 'Paid' ? new Date('2024-07-25').toISOString() : null;

  // Assuming bill data is the same for all entries in the given month
  const billData = {
    amount: parseFloat(billAmount.toFixed(2)),
    dueDate: dueDate,
    paymentStatus: paymentStatus,
    paymentDate: paymentDate
  };

  return billData;
};

// Function to generate the complete mock data structure
const generateMockData = () => {
  const consumptionData = generateConsumptionData();
  const { peakUsage, averageUsage } = calculatePeakAndAverage(consumptionData);
  const energyEfficiencyRating = generateRandomEnergyEfficiencyRating();

  const mockData = {
    billData: generateBillData(),
    consumptionData: consumptionData,
    energyEfficiencyRating: energyEfficiencyRating,
    peakUsage: parseFloat(peakUsage.toFixed(2)), // Add peak usage to mock data
    averageUsage: parseFloat(averageUsage.toFixed(2)) // Add average usage to mock data
  };

  return mockData;
};

// Function to generate a random energy efficiency rating
const generateRandomEnergyEfficiencyRating = () => {
  const ratings = ['A', 'B', 'C', 'D', 'E']; // List of possible ratings
  const randomIndex = Math.floor(Math.random() * ratings.length); // Random index
  return ratings[randomIndex];
};

// Generate mock data
const mockData = generateMockData();

// Convert data to JSON format
const jsonData = JSON.stringify(mockData, null, 2);

// Write data to a JSON file
const filename = 'mock_data_hourly4.json';
fs.writeFile(filename, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log(`Hourly mock data saved to ${filename}`);
});
