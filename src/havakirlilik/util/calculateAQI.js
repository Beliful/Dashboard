const breakpoints = {
    O3: [
        { AQI: [0, 50], C: [0.000, 0.054] },
        { AQI: [51, 100], C: [0.055, 0.070] },
        { AQI: [101, 150], C: [0.071, 0.085] },
        { AQI: [151, 200], C: [0.086, 0.105] },
        { AQI: [201, 300], C: [0.106, 0.200] },
    ],
    PM25: [
        { AQI: [0, 50], C: [0.0, 12.0] },
        { AQI: [51, 100], C: [12.1, 35.4] },
        { AQI: [101, 150], C: [35.5, 55.4] },
        { AQI: [151, 200], C: [55.5, 150.4] },
        { AQI: [201, 300], C: [150.5, 250.4] },
    ],
    PM10: [
        { AQI: [0, 50], C: [0, 54] },
        { AQI: [51, 100], C: [55, 154] },
        { AQI: [101, 150], C: [155, 254] },
        { AQI: [151, 200], C: [255, 354] },
        { AQI: [201, 300], C: [355, 424] },
    ],
    CO: [
        { AQI: [0, 50], C: [0.0, 4.4] },
        { AQI: [51, 100], C: [4.5, 9.4] },
        { AQI: [101, 150], C: [9.5, 12.4] },
        { AQI: [151, 200], C: [12.5, 15.4] },
        { AQI: [201, 300], C: [15.5, 30.4] },
    ],
    SO2: [
        { AQI: [0, 50], C: [0, 35] },
        { AQI: [51, 100], C: [36, 75] },
        { AQI: [101, 150], C: [76, 185] },
        { AQI: [151, 200], C: [186, 304] },
        { AQI: [201, 300], C: [305, 604] },
    ],
    NO2: [
        { AQI: [0, 50], C: [0, 53] },
        { AQI: [51, 100], C: [54, 100] },
        { AQI: [101, 150], C: [101, 360] },
        { AQI: [151, 200], C: [361, 649] },
        { AQI: [201, 300], C: [650, 1249] },
    ],
};

export const calculateAQI = (pollutants) => {
    
    let maxAQICategory = "Good"; // Assume the best case by default

    // Iterate over each pollutant and calculate its AQI
    Object.keys(pollutants).forEach(pollutant => {
        const concentration = pollutants[pollutant];
        const bp = breakpoints[pollutant].find(bp => concentration >= bp.C[0] && concentration <= bp.C[1]);

        if (bp) {
            const [I_lo, I_hi] = bp.AQI;
            const [C_lo, C_hi] = bp.C;
            const AQI = ((I_hi - I_lo) / (C_hi - C_lo)) * (concentration - C_lo) + I_lo;

            // Determine AQI category based on AQI value
            let category = "Good";
            if (AQI > 50) category = "Moderate";
            if (AQI > 100) category = "Unhealthy for Sensitive Groups";
            if (AQI > 150) category = "Unhealthy";
            if (AQI > 200) category = "Very Unhealthy";
            if (AQI > 300) category = "Hazardous";

            // Update maxAQICategory if current pollutant's category is worse
            if (category === "Moderate" && maxAQICategory === "Good") {
                maxAQICategory = "Moderate";
            } else if (category === "Unhealthy for Sensitive Groups" && (maxAQICategory === "Good" || maxAQICategory === "Moderate")) {
                maxAQICategory = "Unhealthy for Sensitive Groups";
            } else if (category === "Unhealthy" && (maxAQICategory === "Good" || maxAQICategory === "Moderate" || maxAQICategory === "Unhealthy for Sensitive Groups")) {
                maxAQICategory = "Unhealthy";
            } else if (category === "Very Unhealthy" && (maxAQICategory === "Good" || maxAQICategory === "Moderate" || maxAQICategory === "Unhealthy for Sensitive Groups" || maxAQICategory === "Unhealthy")) {
                maxAQICategory = "Very Unhealthy";
            } else if (category === "Hazardous" && (maxAQICategory === "Good" || maxAQICategory === "Moderate" || maxAQICategory === "Unhealthy for Sensitive Groups" || maxAQICategory === "Unhealthy" || maxAQICategory === "Very Unhealthy")) {
                maxAQICategory = "Hazardous";
            }
        }
    });

    return maxAQICategory;
}