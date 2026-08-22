// // ─── EcoCommute Type Definitions ───

// export interface User {
//   _id?: string;
//   id?: string;
//   name: string;
//   email: string;
//   password?: string;
//   role: "user" | "company" | "employee";
//   companyId?: string;
//   employeeId?: string;
//   preferences: {
//     weightProfile: "balanced" | "cost" | "eco" | "time";
//     preferredMode?: string;
//     maxBudget?: number;
//     maxTime?: number;
//   };
//   greenPoints: number;
//   totalTrips: number;
//   totalCO2Saved: number;
//   totalMoneySaved: number;
//   createdAt: string;
// }

// export interface Company {
//   _id?: string;
//   id?: string;
//   name: string;
//   email: string;
//   password?: string;
//   location: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   workingHours: {
//     start: string;
//     end: string;
//   };
//   commutePolicy: string;
//   monthlyBudget: number;
//   transportOptions: string[];
//   rewardRules: string;
//   bestEmployeeCriteria: string;
//   createdAt: string;
// }

// export interface Employee {
//   _id?: string;
//   id?: string;
//   userId?: string;
//   companyId: string;
//   employeeCode: string;
//   name: string;
//   email: string;
//   department?: string;
//   homeLocation: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   officeLocation: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   arrivalTime: string;
//   departureTime: string;
//   preferredMode: string;
//   greenPoints: number;
//   ecoScore: number;
//   totalTrips: number;
//   sustainableTrips: number;
//   totalCO2Saved: number;
//   totalMoneySaved: number;
// }

// export interface Trip {
//   _id?: string;
//   id?: string;
//   userId: string;
//   companyId?: string;
//   employeeId?: string;
//   from: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   to: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   fromLocationId?: string;
//   toLocationId?: string;
//   mode: string;
//   cost: number;
//   distance: number;
//   distanceKm?: number;
//   time: number;
//   durationMinutes?: number;
//   co2: number;
//   estimatedCo2Kg?: number;
//   ecoScore: number;
//   moneySaved: number;
//   co2Saved: number;
//   passengers: number;
//   carpoolPartner?: string;
//   status: "planned" | "in_progress" | "completed" | "cancelled";
//   date: string;
//   createdAt: string;
//   timestamp?: string | Date;
// }

// export interface TransportOption {
//   mode: string;
//   cost: number;
//   time: number;
//   distance: number;
//   co2: number;
//   ecoScore: number;
//   score: number;
//   rank: number;
//   recommended: boolean;
//   reason: string;
//   moneySaved: number;
//   co2Saved: number;
//   occupancy: number;
//   // UI aliases
//   estimatedCost?: number;
//   durationMinutes?: number;
//   distanceKm?: number;
//   estimatedCo2Kg?: number;
// }

// export interface CarpoolMatch {
//   _id?: string;
//   id?: string;
//   driverId: string;
//   driverName: string;
//   riderId?: string;
//   riderName?: string;
//   from: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   to: {
//     name: string;
//     lat: number;
//     lng: number;
//   };
//   departureTime: string;
//   availableSeats: number;
//   estimatedCost: number;
//   estimatedCO2PerPerson: number;
//   estimatedSavings: number;
//   status: "available" | "matched" | "completed";
// }

// export interface Reward {
//   _id?: string;
//   id?: string;
//   companyId: string;
//   employeeId: string;
//   employeeName: string;
//   points: number;
//   amount?: number;
//   reason: string;
//   status?: "pending" | "awarded" | "redeemed";
//   date: string;
// }

// export interface AutomationEvent {
//   _id?: string;
//   eventId: string;
//   eventType: string;
//   companyId?: string;
//   employeeId?: string;
//   status: "delivered" | "logged_locally" | "failed";
//   payload: any;
//   webhookUrl?: string;
//   statusCode?: number;
//   responseMessage?: string;
//   createdAt: string;
// }

// export interface ParkingSpot {
//   _id?: string;
//   id?: string;
//   name: string;
//   location: string;
//   totalSpots: number;
//   evChargingSpots: number;
//   carpoolReservedSpots: number;
//   availableSpots: number;
//   hourlyRate: number;
//   companyReserved: boolean;
// }

// export interface CommuteRequest {
//   from: string;
//   to: string;
//   fromLat?: number;
//   fromLng?: number;
//   toLat?: number;
//   toLng?: number;
//   preferredMode?: string;
//   preferredTransport?: string;
//   passengers?: number;
//   carpoolSeats?: number;
//   priority?: "balanced" | "save-money" | "eco-friendly" | "save-time" | "cost" | "eco" | "time";
//   weightProfile?: "balanced" | "cost" | "eco" | "time";
//   maxBudget?: number;
//   maxTime?: number;
// }

// export interface CommuteResult {
//   options: TransportOption[];
//   recommended: TransportOption;
//   carpoolMatch?: CarpoolMatch;
//   from: { name: string; lat: number; lng: number };
//   to: { name: string; lat: number; lng: number };
//   request?: CommuteRequest;
// }

// export interface DashboardStats {
//   todayTrips: number;
//   weekTrips: number;
//   monthTrips: number;
//   totalCO2Saved: number;
//   totalMoneySaved: number;
//   totalCo2Saved?: number;
//   avgEcoScore?: number;
//   totalTrips?: number;
//   ecoScore: number;
//   greenPoints: number;
//   sustainablePercentage: number;
//   recentTrips: Trip[];
// }

// export interface CompanyDashboardStats {
//   totalEmployees: number;
//   todayTrips: number;
//   todaySustainableTrips?: number;
//   co2SavedMonth: number;
//   moneySavedMonth: number;
//   carpoolRate: number;
//   publicTransportUsage: number;
//   sustainablePercentage: number;
//   weeklyTrend: { week: string; co2Saved: number; trips: number }[];
//   monthlyTrend: { month: string; co2Saved: number; moneySaved: number }[];
//   topEmployees: { name: string; ecoScore: number; greenPoints: number; trips: number; department?: string }[];
//   modeDistribution: { mode: string; count: number; percentage: number }[];
// }




// ─── EcoCommute Type Definitions ───

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "company" | "employee";
  companyId?: string;
  employeeId?: string;
  preferences: {
    weightProfile: "balanced" | "cost" | "eco" | "time";
    preferredMode?: string;
    maxBudget?: number;
    maxTime?: number;
  };
  greenPoints: number;
  totalTrips: number;
  totalCO2Saved: number;
  totalMoneySaved: number;
  // Newly added personal metrics
  ecoScore?: number;
  co2Avoided?: number;
  moneySaved?: number;
  createdAt: string;
}

export interface Company {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  workingHours: {
    start: string;
    end: string;
  };
  commutePolicy: string;
  monthlyBudget: number;
  transportOptions: string[];
  rewardRules: string;
  bestEmployeeCriteria: string;
  createdAt: string;
}

export interface Employee {
  _id?: string;
  id?: string;
  userId?: string;
  companyId: string;
  employeeCode: string;
  name: string;
  email: string;
  department?: string;
  homeLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  officeLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  arrivalTime: string;
  departureTime: string;
  preferredMode: string;
  greenPoints: number;
  ecoScore: number;
  totalTrips: number;
  sustainableTrips: number;
  totalCO2Saved: number;
  totalMoneySaved: number;
}

export interface Trip {
  _id?: string;
  id?: string;
  userId: string;
  companyId?: string;
  employeeId?: string;
  from: {
    name: string;
    lat: number;
    lng: number;
  };
  to: {
    name: string;
    lat: number;
    lng: number;
  };
  fromLocationId?: string;
  toLocationId?: string;
  mode: string;
  cost: number;
  distance: number;
  distanceKm?: number;
  time: number;
  durationMinutes?: number;
  co2: number;
  estimatedCo2Kg?: number;
  ecoScore: number;
  moneySaved: number;
  co2Saved: number;
  passengers: number;
  carpoolPartner?: string;
  status: "planned" | "in_progress" | "completed" | "cancelled";
  date: string;
  createdAt: string;
  timestamp?: string | Date;
}

export interface TransportOption {
  mode: string;
  cost: number;
  time: number;
  distance: number;
  co2: number;
  ecoScore: number;
  score: number;
  rank: number;
  recommended: boolean;
  reason: string;
  moneySaved: number;
  co2Saved: number;
  occupancy: number;
  // UI aliases
  estimatedCost?: number;
  durationMinutes?: number;
  distanceKm?: number;
  estimatedCo2Kg?: number;
}

export interface CarpoolMatch {
  _id?: string;
  id?: string;
  driverId: string;
  driverName: string;
  riderId?: string;
  riderName?: string;
  from: {
    name: string;
    lat: number;
    lng: number;
  };
  to: {
    name: string;
    lat: number;
    lng: number;
  };
  departureTime: string;
  availableSeats: number;
  estimatedCost: number;
  estimatedCO2PerPerson: number;
  estimatedSavings: number;
  status: "available" | "matched" | "completed";
}

export interface Reward {
  _id?: string;
  id?: string;
  companyId: string;
  employeeId: string;
  employeeName: string;
  points: number;
  amount?: number;
  reason: string;
  status?: "pending" | "awarded" | "redeemed";
  date: string;
}

export interface AutomationEvent {
  _id?: string;
  eventId: string;
  eventType: string;
  companyId?: string;
  employeeId?: string;
  status: "delivered" | "logged_locally" | "failed";
  payload: any;
  webhookUrl?: string;
  statusCode?: number;
  responseMessage?: string;
  createdAt: string;
}

export interface ParkingSpot {
  _id?: string;
  id?: string;
  name: string;
  location: string;
  totalSpots: number;
  evChargingSpots: number;
  carpoolReservedSpots: number;
  availableSpots: number;
  hourlyRate: number;
  companyReserved: boolean;
}

export interface CommuteRequest {
  from: string;
  to: string;
  fromLat?: number;
  fromLng?: number;
  toLat?: number;
  toLng?: number;
  preferredMode?: string;
  preferredTransport?: string;
  passengers?: number;
  carpoolSeats?: number;
  priority?: "balanced" | "save-money" | "eco-friendly" | "save-time" | "cost" | "eco" | "time";
  weightProfile?: "balanced" | "cost" | "eco" | "time";
  maxBudget?: number;
  maxTime?: number;
}

export interface CommuteResult {
  options: TransportOption[];
  recommended: TransportOption;
  carpoolMatch?: CarpoolMatch;
  from: { name: string; lat: number; lng: number };
  to: { name: string; lat: number; lng: number };
  request?: CommuteRequest;
}

export interface DashboardStats {
  todayTrips: number;
  weekTrips: number;
  monthTrips: number;
  totalCO2Saved: number;
  totalMoneySaved: number;
  totalCo2Saved?: number;
  avgEcoScore?: number;
  totalTrips?: number;
  ecoScore: number;
  greenPoints: number;
  sustainablePercentage: number;
  recentTrips: Trip[];
}

export interface CompanyDashboardStats {
  totalEmployees: number;
  todayTrips: number;
  todaySustainableTrips?: number;
  co2SavedMonth: number;
  moneySavedMonth: number;
  carpoolRate: number;
  publicTransportUsage: number;
  sustainablePercentage: number;
  weeklyTrend: { week: string; co2Saved: number; trips: number }[];
  monthlyTrend: { month: string; co2Saved: number; moneySaved: number }[];
  topEmployees: { name: string; ecoScore: number; greenPoints: number; trips: number; department?: string }[];
  modeDistribution: { mode: string; count: number; percentage: number }[];
}