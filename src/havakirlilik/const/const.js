export const pollutants = {
    O3: { name: "O3", min: 0.0, max: 0.2, unit: "ppm" }, // Ozone (ppm)
    PM25: { name: "PM25", min: 0, max: 150, unit: "µg/m³" }, // PM2.5 (µg/m³)
    PM10: { name: "PM10", min: 0, max: 200, unit: "µg/m³" }, // PM10 (µg/m³)
    CO: { name: "CO", min: 0.0, max: 10.0, unit: "ppm" }, // Carbon monoxide (ppm)
    SO2: { name: "S02", min: 0, max: 200, unit: "ppb" }, // Sulfur dioxide (ppb)
    NO2: { name: "NO2", min: 0, max: 200, unit: "ppb" } // Nitrogen dioxide (ppb)
};

export const locations = {
    Izmir: { 
        id: 1,
        name: "Izmir", 
        def: "Kordon",
        lat: 38.43538, 
        lon: 27.14047 
    }, 
    Kusadasi: { 
        id: 2,
        name: "Kusadasi", 
        def: "Yılancı Burnu",
        lat: 37.858822, 
        lon: 27.242339 
    }, 
    Turunc: { 
        id: 3,
        name: "Turunc", 
        def: "Halk Plajı",
        lat: 36.77583, 
        lon: 28.24853 
    },
    Datca: { 
        id: 4,
        name: "Datca", 
        def: "Hastanealtı Plajı",
        lat: 36.72692, 
        lon: 27.68819 
    },
};

export const findLocationByName = (name) => {
    for (const key in locations) {
        if (locations[key].name === name) {
            return locations[key];
        }
    }
    return null;
};

export const findLocationById = (id) => {
    for (const key in locations) {
        if (locations[key].id == id) {
            return locations[key];
        }
    }
    return null;
};
