
export const API_URL = "https://script.google.com/macros/s/AKfycbzTuzflh0QdyBiPSHYiv51pu1FSS-J8I6h_gh1B9yOojBT2M93g_to6HDfSy5ljMigG/exec";

// Strict Column Mapping (2D Array Indices) - FORCED ALIGNMENT
// These match the structure: [ID, Date, Entity, Detail/Category, Metric1, Metric2, Metric3, ...]
export const INDICES = {
  TRUCK: { 
    ID: 0, 
    NAME: 1, 
    CAPACITY: 2 
  },
  DRIVER: { 
    ID: 0, 
    NAME: 1, 
    LICENSE: 2, 
    CONTACT: 3 
  },
  TRIP: { 
    ENTRY_ID: 0,
    DATE: 1,
    TRUCK_ID: 2,
    DRIVER: 3,
    ORIGIN: 4,
    DESTINATION: 5,
    START_KM: 6,
    END_KM: 7,
    TOTAL_KM: 8    // Result of End - Start
  },
  FUEL: { 
    ID: 0, 
    DATE: 1, 
    TRUCK: 2,
    COST: 3,
    FUEL_ADDED: 4 
  },
  EXPENSE: { 
    ID: 0,
    DATE: 1, 
    CATEGORY: 2,
    DESCRIPTION: 3,
    TRUCK: 4,
    REFERENCE: 5,
    AMOUNT: 6 
  }
};
