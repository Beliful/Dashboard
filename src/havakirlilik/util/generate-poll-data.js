const fs = require('fs');

function generateRandomData(startDate, endDate) {
    const pollutants = {
        O3: { min: 0.0, max: 0.01 }, // Ozone (ppm)
        PM25: { min: 0, max: 1 }, // PM2.5 (µg/m³)
        PM10: { min: 0, max: 5 }, // PM10 (µg/m³)
        CO: { min: 0.0, max: 1.0 }, // Carbon monoxide (ppm)
        SO2: { min: 0, max: 10 }, // Sulfur dioxide (ppb)
        NO2: { min: 0, max: 10 } // Nitrogen dioxide (ppb)
    };
    // const pollutants = {
    //     O3: { min: 0.0, max: 0.2 }, // Ozone (ppm)
    //     PM25: { min: 0, max: 150 }, // PM2.5 (µg/m³)
    //     PM10: { min: 0, max: 200 }, // PM10 (µg/m³)
    //     CO: { min: 0.0, max: 10.0 }, // Carbon monoxide (ppm)
    //     SO2: { min: 0, max: 200 }, // Sulfur dioxide (ppb)
    //     NO2: { min: 0, max: 200 } // Nitrogen dioxide (ppb)
    // };

    const data = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const hourlyData = {
            timestamp: new Date(currentDate).toISOString(),
            measurements: {}
        };
    
        for (const [pollutant, range] of Object.entries(pollutants)) {
            hourlyData.measurements[pollutant] = (
                Math.random() * (range.max - range.min) + range.min
            ).toFixed(2);
        }
    
        data.push(hourlyData);
        currentDate.setHours(currentDate.getHours() + 1);
    }

    return data;
}

const startDate = new Date('2023-06-09T00:00:00');
const endDate = new Date('2023-06-15T23:59:59');
const randomData = generateRandomData(startDate, endDate);

fs.writeFile('pollutionData2.json', JSON.stringify(randomData, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
