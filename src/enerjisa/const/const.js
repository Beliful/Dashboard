export const units = {
    electricityUsage: "kWh", // kilowatt-hours
    averageUsage: "kWh", // kilowatt-hours
    peakUsage: "kW" // kilowatts
  }

export const factories = [
    { 
        id: 0,
        name: "Sarar",
        type: "Textiles", 
        location: {
            city: "Eshisehir",
            def: "Odunpazarı",
            lat: 38.739775, 
            lon: 32.640951
        }        
    }, 
    { 
        id: 1,
        name: "ETI",
        type: "Food Processing", 
        location: {
            city: "Eskisehir",
            def: "Odunpazarı",
            lat: 39.746467, 
            lon: 30.656139
        }        
    }, 
    { 
        id: 2,
        name: "Toyota", 
        type: "Motor Manufacturing",
        location: {
            city: "Sakarya",
            def: "Arifiye",
            lat: 40.708297, 
            lon: 30.394673
        }        
    }, 
    { 
        id: 3,
        name: "Vestel", 
        type: "Appliances Manufacturing",
        location: {
            city: "Manisa",
            def: "Yunusemre",
            lat: 38.623608, 
            lon: 27.344553
        }        
    }, 
    { 
        id: 4,
        name: "Kayseri Seker Fabrikasi", 
        type: "Food Processing",
        location: {
            city: "Kayseri",
            def: "Kocasinan",
            lat: 38.727737, 
            lon: 35.443085
        }        
    }, 
];

export const findFactoryById = (id) => {
    return factories.find(factory => factory.id == id);
};
