
import { DashboardData, DataRow } from '../types';
import { API_URL } from '../constants';

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    // Emergency Debug Log as requested
    console.log('FULL DATA:', data);

    // Normalize keys: check for rawTrips/trips, rawFuel/fuel, etc.
    return {
      trips: data.rawTrips || data.trips || [],
      fuel: data.rawFuel || data.fuel || [],
      expenses: data.rawExpenses || data.expenses || [],
      trucks: data.rawTrucks || data.trucks || [],
      drivers: data.rawDrivers || data.drivers || [],
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Mock data for fallback (using strict requested indices)
    return {
      trips: [
        ["TRP-101", "2024-03-01", "T-01", "John Doe", "NYC", "PHL", 45000, 45210, 210],
        ["TRP-102", "2024-03-02", "T-02", "Jane Smith", "CHI", "DET", 32000, 32280, 280]
      ],
      fuel: [
        ["FL-01", "2024-03-01", "T-01", 450, 120],
        ["FL-02", "2024-03-02", "T-02", 560, 150]
      ],
      expenses: [
        ["EXP-01", "2024-03-01", "Maintenance", "Brake pads", "T-01", "REF-1", 1200],
        ["EXP-02", "2024-03-02", "Tolls", "Route 95", "T-02", "REF-2", 50]
      ],
      trucks: [
        ["T-01", "Freightliner #1", "40 Tons"],
        ["T-02", "Volvo VNL", "38 Tons"]
      ],
      drivers: [
        ["D-01", "John Doe", "CDL-A123", "+123456789"],
        ["D-02", "Jane Smith", "CDL-B456", "+198765432"]
      ]
    };
  }
}

export async function submitData(targetSheet: string, rowData: any[]): Promise<boolean> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetSheet, rowData }),
    });
    return true; 
  } catch (error) {
    console.error('Submission failed:', error);
    return false;
  }
}
