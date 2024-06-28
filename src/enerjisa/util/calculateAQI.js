import { AQINames } from "../const/enums";

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
    
    let maxAQICategory = AQINames.GOOD; // Assume the best case by default

    // Iterate over each pollutant and calculate its AQI
    Object.keys(pollutants).forEach(pollutant => {
        const concentration = pollutants[pollutant];
        const bp = breakpoints[pollutant].find(bp => concentration >= bp.C[0] && concentration <= bp.C[1]);

        if (bp) {
            const [I_lo, I_hi] = bp.AQI;
            const [C_lo, C_hi] = bp.C;
            const AQI = ((I_hi - I_lo) / (C_hi - C_lo)) * (concentration - C_lo) + I_lo;

            // Determine AQI category based on AQI value
            let category = AQINames.GOOD;
            if (AQI > 50) category = AQINames.MODERATE;
            if (AQI > 100) category = AQINames.UNHEALTHY_FOR_SENSITIVE;
            if (AQI > 150) category = AQINames.UNHEALTHY;
            if (AQI > 200) category = AQINames.VERY_UNHEALTHY;
            if (AQI > 300) category = AQINames.HAZARDOUS;

            // Update maxAQICategory if current pollutant's category is worse
            if (category === AQINames.MODERATE && maxAQICategory === AQINames.GOOD) {
                maxAQICategory = AQINames.MODERATE;
            } else if (category === AQINames.UNHEALTHY_FOR_SENSITIVE && (maxAQICategory === AQINames.GOOD || maxAQICategory === AQINames.MODERATE)) {
                maxAQICategory = AQINames.UNHEALTHY_FOR_SENSITIVE;
            } else if (category === AQINames.UNHEALTHY && (maxAQICategory === AQINames.GOOD || maxAQICategory === AQINames.MODERATE || maxAQICategory === AQINames.UNHEALTHY_FOR_SENSITIVE)) {
                maxAQICategory = AQINames.UNHEALTHY;
            } else if (category === AQINames.VERY_UNHEALTHY && (maxAQICategory === AQINames.GOOD || maxAQICategory === AQINames.MODERATE || maxAQICategory === AQINames.UNHEALTHY_FOR_SENSITIVE || maxAQICategory === AQINames.UNHEALTHY)) {
                maxAQICategory = AQINames.VERY_UNHEALTHY;
            } else if (category === AQINames.HAZARDOUS && (maxAQICategory === AQINames.GOOD || maxAQICategory === AQINames.MODERATE || maxAQICategory === AQINames.UNHEALTHY_FOR_SENSITIVE || maxAQICategory === AQINames.UNHEALTHY || maxAQICategory === AQINames.VERY_UNHEALTHY)) {
                maxAQICategory = AQINames.HAZARDOUS;
            }
        }
    });

    return maxAQICategory;
}