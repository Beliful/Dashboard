export const pollutants = {
    O3: { min: 0.0, max: 0.2, unit: "ppm" }, // Ozone (ppm)
    PM25: { min: 0, max: 150, unit: "µg/m³" }, // PM2.5 (µg/m³)
    PM10: { min: 0, max: 200, unit: "µg/m³" }, // PM10 (µg/m³)
    CO: { min: 0.0, max: 10.0, unit: "ppm" }, // Carbon monoxide (ppm)
    SO2: { min: 0, max: 200, unit: "ppb" }, // Sulfur dioxide (ppb)
    NO2: { min: 0, max: 200, unit: "ppb" } // Nitrogen dioxide (ppb)
};

export const locations = {
    Izmir: { 
        name: "İzmir", 
        def: "Kordon",
        lat: 38.43538, 
        lon: 27.14047 
    }, 
    Turunc: { 
        name: "Turunç", 
        def: "Halk Plajı",
        lat: 36.77583, 
        lon: 28.24853 
    },
    Datca: { 
        name: "Datça", 
        def: "Hastanealtı Plajı",
        lat: 36.72692, 
        lon: 27.68819 
    },
};
