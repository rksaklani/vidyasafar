export interface School {
  id: string;
  name: string;
  city: string;
  totalBuses: number;
  totalStudents: number;
  board: string;
  campusAddress: string;
  latitude: number;
  longitude: number;
  principal: string;
}

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  legMin: number;
  radiusM: number;
  kind: "stop" | "campus";
}

export interface Route {
  id: string;
  schoolId: string;
  code: string;
  name: string;
  startTime: string;
  stops: RouteStop[];
}

export interface Bus {
  id: string;
  schoolId: string;
  busNumber: string;
  registrationNumber: string;
  driverName: string;
  driverPhone: string;
  attendantName: string;
  capacity: number;
  currentOccupancy: number;
  currentSpeedKmH: number;
  status: "on-time" | "delayed" | "stopped" | "sos";
  latitude: number;
  longitude: number;
  lastUpdated: string;
  routeId: string;
  ownership: "owned" | "contracted";
  vendor?: string;
  progress: number;
  delayMinutes?: number;
  note?: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
  currentStop?: string;
  nextStop?: string;
}

export interface Student {
  id: string;
  schoolId: string;
  name: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  stopName: string;
  busId: string;
  status: "pending" | "boarded" | "absent" | "arrived";
  boardingTime?: string;
  feeStatus: "paid" | "pending" | "overdue";
  feeAmount: number;
  admissionNo: string;
}

export interface Driver {
  id: string;
  schoolId: string;
  name: string;
  phone: string;
  role: "driver" | "attendant";
  licenseNumber: string;
  licenseExpiry: string;
  badgeExpiry: string;
  policeVerification: "verified" | "pending" | "expired";
  busId: string;
}

export interface BroadcastTemplate {
  id: string;
  title: string;
  body: string;
  audience: string;
}

export interface BroadcastRecord {
  id: string;
  schoolId: string;
  title: string;
  body: string;
  channels: Array<"whatsapp" | "push" | "sms">;
  audience: string;
  sentAt: string;
  recipients: number;
}

const MORNING = "2026-10-26T07:42:00+05:30";

export const schools: School[] = [
  {
    id: "sch_nalanda",
    name: "Nalanda Vidya Niketan",
    city: "Bengaluru",
    totalBuses: 28,
    totalStudents: 1840,
    board: "CBSE",
    campusAddress: "ITPL Main Road, Whitefield, Bengaluru 560066",
    latitude: 12.9698,
    longitude: 77.7499,
    principal: "Anita Deshpande",
  },
  {
    id: "sch_riverdale",
    name: "Riverdale Public School",
    city: "Gurugram",
    totalBuses: 16,
    totalStudents: 960,
    board: "CBSE",
    campusAddress: "Sector 46, Gurugram 122003",
    latitude: 28.4302,
    longitude: 77.0628,
    principal: "Harpreet Singh",
  },
  {
    id: "sch_stthomas",
    name: "St. Thomas Academy",
    city: "Mumbai",
    totalBuses: 11,
    totalStudents: 640,
    board: "ICSE",
    campusAddress: "Lokhandwala, Andheri West, Mumbai 400053",
    latitude: 19.1307,
    longitude: 72.8296,
    principal: "Ruth Fernandes",
  },
];

function stop(
  id: string,
  name: string,
  lat: number,
  lng: number,
  legMin: number,
  kind: RouteStop["kind"] = "stop",
  radiusM = kind === "campus" ? 1000 : 200,
): RouteStop {
  return { id, name, lat, lng, legMin, radiusM, kind };
}

export const routes: Route[] = [
  {
    id: "r04",
    schoolId: "sch_nalanda",
    code: "R-04",
    name: "ITPL Corridor",
    startTime: "06:50",
    stops: [
      stop("r04-s1", "Marathahalli Bridge", 12.9568, 77.701, 0),
      stop("r04-s2", "Kundalahalli Gate", 12.956, 77.7156, 8),
      stop("r04-s3", "Brookefield", 12.9649, 77.7168, 6),
      stop("r04-s4", "AECS Layout", 12.9694, 77.7284, 7),
      stop("r04-s5", "Graphite Signal", 12.9748, 77.7372, 6),
      stop("r04-s6", "ITPL Main Gate", 12.9858, 77.7368, 8),
      stop("r04-s7", "Vydehi Circle", 12.9756, 77.749, 9),
      stop("r04-campus", "Campus Gate", 12.9698, 77.7499, 6, "campus"),
    ],
  },
  {
    id: "r07",
    schoolId: "sch_nalanda",
    code: "R-07",
    name: "Sarjapur Loop",
    startTime: "06:40",
    stops: [
      stop("r07-s1", "Bellandur Gate", 12.9259, 77.6765, 0),
      stop("r07-s2", "Kadubeesanahalli", 12.9392, 77.6958, 10),
      stop("r07-s3", "Panathur", 12.9355, 77.7052, 7),
      stop("r07-s4", "Gunjur Palya", 12.9278, 77.7348, 11),
      stop("r07-s5", "Varthur Kodi", 12.9408, 77.7462, 8),
      stop("r07-s6", "Hope Farm", 12.9848, 77.751, 12),
      stop("r07-campus", "Campus Gate", 12.9698, 77.7499, 7, "campus"),
    ],
  },
  {
    id: "r12",
    schoolId: "sch_nalanda",
    code: "R-12",
    name: "Kadugodi Express",
    startTime: "06:55",
    stops: [
      stop("r12-s1", "Seegehalli", 13.0105, 77.76, 0),
      stop("r12-s2", "Kadugodi", 12.9975, 77.7605, 8),
      stop("r12-s3", "Whitefield Club", 12.9902, 77.7518, 7),
      stop("r12-s4", "Vydehi Hospital", 12.9772, 77.7516, 7),
      stop("r12-campus", "Campus Gate", 12.9698, 77.7499, 6, "campus"),
    ],
  },
  {
    id: "r18",
    schoolId: "sch_nalanda",
    code: "R-18",
    name: "Varthur Belt",
    startTime: "07:00",
    stops: [
      stop("r18-s1", "Varthur Market", 12.94, 77.7475, 0),
      stop("r18-s2", "Siddapura", 12.952, 77.7488, 7),
      stop("r18-s3", "Thubarahalli", 12.9588, 77.7462, 6),
      stop("r18-s4", "Spice Garden", 12.9635, 77.742, 6),
      stop("r18-campus", "Campus Gate", 12.9698, 77.7499, 6, "campus"),
    ],
  },
  {
    id: "r_gc",
    schoolId: "sch_riverdale",
    code: "R-04",
    name: "Golf Course Corridor",
    startTime: "07:05",
    stops: [
      stop("rg-s1", "Sector 56", 28.4198, 77.0892, 0),
      stop("rg-s2", "Wazirabad", 28.4266, 77.0814, 7),
      stop("rg-s3", "Sector 46", 28.4288, 77.0655, 6),
      stop("rg-campus", "Campus Gate", 28.4302, 77.0628, 5, "campus"),
    ],
  },
  {
    id: "r_sohna",
    schoolId: "sch_riverdale",
    code: "R-09",
    name: "Sohna Road Belt",
    startTime: "06:55",
    stops: [
      stop("rs-s1", "Badshahpur", 28.3955, 77.0468, 0),
      stop("rs-s2", "Vatika Chowk", 28.4058, 77.0488, 8),
      stop("rs-s3", "Sector 48", 28.4168, 77.0555, 7),
      stop("rs-campus", "Campus Gate", 28.4302, 77.0628, 8, "campus"),
    ],
  },
  {
    id: "r_lok",
    schoolId: "sch_stthomas",
    code: "R-02",
    name: "Lokhandwala Loop",
    startTime: "07:00",
    stops: [
      stop("ml-s1", "Versova Jetty", 19.1352, 72.8122, 0),
      stop("ml-s2", "Lokhandwala Circle", 19.1435, 72.8248, 7),
      stop("ml-s3", "Four Bungalows", 19.1272, 72.8255, 8),
      stop("ml-campus", "Campus Gate", 19.1307, 72.8296, 6, "campus"),
    ],
  },
  {
    id: "r_jvlr",
    schoolId: "sch_stthomas",
    code: "R-06",
    name: "JVLR Express",
    startTime: "06:50",
    stops: [
      stop("mj-s1", "SEEPZ Gate", 19.1255, 72.8765, 0),
      stop("mj-s2", "JVLR Junction", 19.1188, 72.864, 8),
      stop("mj-s3", "Marol Depot", 19.1102, 72.8505, 7),
      stop("mj-campus", "Campus Gate", 19.1307, 72.8296, 10, "campus"),
    ],
  },
];

export const buses: Bus[] = [
  {
    id: "b12",
    schoolId: "sch_nalanda",
    busNumber: "12",
    registrationNumber: "KA05HS2218",
    driverName: "Ramesh Gowda",
    driverPhone: "9845011220",
    attendantName: "Lakshmi Bai",
    capacity: 40,
    currentOccupancy: 34,
    currentSpeedKmH: 32,
    status: "on-time",
    latitude: 12.9782,
    longitude: 77.7374,
    lastUpdated: MORNING,
    routeId: "r04",
    ownership: "owned",
    progress: 0.55,
    insuranceExpiry: "2027-06-30",
    fitnessExpiry: "2027-01-15",
    currentStop: "Graphite Signal",
    nextStop: "ITPL Main Gate",
  },
  {
    id: "b07",
    schoolId: "sch_nalanda",
    busNumber: "07",
    registrationNumber: "KA05HS4412",
    driverName: "Imran Pasha",
    driverPhone: "9845099331",
    attendantName: "Fatima Sheikh",
    capacity: 42,
    currentOccupancy: 31,
    currentSpeedKmH: 16,
    status: "delayed",
    latitude: 12.934,
    longitude: 77.7088,
    lastUpdated: MORNING,
    routeId: "r07",
    ownership: "contracted",
    vendor: "Deccan Wheels",
    progress: 0.4,
    delayMinutes: 11,
    note: "Traffic holding at Panathur junction.",
    insuranceExpiry: "2026-12-01",
    fitnessExpiry: "2026-11-20",
    currentStop: "Panathur",
    nextStop: "Gunjur Palya",
  },
  {
    id: "b18",
    schoolId: "sch_nalanda",
    busNumber: "18",
    registrationNumber: "KA03EJ1184",
    driverName: "Suresh Poojary",
    driverPhone: "9900112233",
    attendantName: "Geeta Nair",
    capacity: 40,
    currentOccupancy: 22,
    currentSpeedKmH: 36,
    status: "on-time",
    latitude: 12.994,
    longitude: 77.7588,
    lastUpdated: MORNING,
    routeId: "r12",
    ownership: "owned",
    progress: 0.28,
    insuranceExpiry: "2027-09-12",
    fitnessExpiry: "2027-04-02",
    currentStop: "Kadugodi",
    nextStop: "Whitefield Club",
  },
  {
    id: "b03",
    schoolId: "sch_nalanda",
    busNumber: "03",
    registrationNumber: "KA01MD9091",
    driverName: "Manoj Tiwari",
    driverPhone: "9812347788",
    attendantName: "Rekha Singh",
    capacity: 36,
    currentOccupancy: 18,
    currentSpeedKmH: 0,
    status: "stopped",
    latitude: 12.9772,
    longitude: 77.7516,
    lastUpdated: MORNING,
    routeId: "r12",
    ownership: "contracted",
    vendor: "Northline Logistics",
    progress: 0.62,
    note: "Engine temperature high. Replacement van requested.",
    insuranceExpiry: "2026-11-08",
    fitnessExpiry: "2027-04-01",
    currentStop: "Vydehi Hospital",
    nextStop: "Campus Gate",
  },
  {
    id: "b21",
    schoolId: "sch_nalanda",
    busNumber: "21",
    registrationNumber: "KA05HS3304",
    driverName: "Abdul Kareem",
    driverPhone: "9845123456",
    attendantName: "Savita Devi",
    capacity: 40,
    currentOccupancy: 27,
    currentSpeedKmH: 30,
    status: "on-time",
    latitude: 12.9635,
    longitude: 77.7188,
    lastUpdated: MORNING,
    routeId: "r04",
    ownership: "owned",
    progress: 0.22,
    insuranceExpiry: "2028-01-20",
    fitnessExpiry: "2027-08-11",
    currentStop: "Brookefield",
    nextStop: "AECS Layout",
  },
  {
    id: "b09",
    schoolId: "sch_nalanda",
    busNumber: "09",
    registrationNumber: "KA02AB7740",
    driverName: "Harish Shetty",
    driverPhone: "9845222100",
    attendantName: "Nirmala Rao",
    capacity: 38,
    currentOccupancy: 24,
    currentSpeedKmH: 18,
    status: "delayed",
    latitude: 12.9555,
    longitude: 77.7472,
    lastUpdated: MORNING,
    routeId: "r18",
    ownership: "owned",
    progress: 0.35,
    delayMinutes: 8,
    note: "Waterlogging near Siddapura.",
    insuranceExpiry: "2027-03-18",
    fitnessExpiry: "2026-12-09",
    currentStop: "Siddapura",
    nextStop: "Thubarahalli",
  },
  {
    id: "b15",
    schoolId: "sch_nalanda",
    busNumber: "15",
    registrationNumber: "KA05HS6621",
    driverName: "Pradeep Kumar",
    driverPhone: "9845333444",
    attendantName: "Asha Devi",
    capacity: 40,
    currentOccupancy: 16,
    currentSpeedKmH: 0,
    status: "sos",
    latitude: 12.9412,
    longitude: 77.7478,
    lastUpdated: MORNING,
    routeId: "r18",
    ownership: "contracted",
    vendor: "Deccan Wheels",
    progress: 0.18,
    note: "Panic button pressed. The school safety desk is on the call.",
    insuranceExpiry: "2027-02-14",
    fitnessExpiry: "2026-11-02",
    currentStop: "Varthur Market",
    nextStop: "Siddapura",
  },
  {
    id: "b02",
    schoolId: "sch_nalanda",
    busNumber: "02",
    registrationNumber: "KA05HS2288",
    driverName: "Joseph Mathew",
    driverPhone: "9845444555",
    attendantName: "Prema Lobo",
    capacity: 44,
    currentOccupancy: 36,
    currentSpeedKmH: 28,
    status: "on-time",
    latitude: 12.9688,
    longitude: 77.7488,
    lastUpdated: MORNING,
    routeId: "r07",
    ownership: "owned",
    progress: 0.8,
    insuranceExpiry: "2028-05-01",
    fitnessExpiry: "2027-11-19",
    currentStop: "Hope Farm",
    nextStop: "Campus Gate",
  },
  {
    id: "g01",
    schoolId: "sch_riverdale",
    busNumber: "04",
    registrationNumber: "HR26DK2104",
    driverName: "Balvinder Singh",
    driverPhone: "9810011122",
    attendantName: "Sunita Devi",
    capacity: 32,
    currentOccupancy: 20,
    currentSpeedKmH: 26,
    status: "on-time",
    latitude: 28.424,
    longitude: 77.084,
    lastUpdated: MORNING,
    routeId: "r_gc",
    ownership: "owned",
    progress: 0.4,
    insuranceExpiry: "2027-08-08",
    fitnessExpiry: "2027-05-05",
    currentStop: "Wazirabad",
    nextStop: "Sector 46",
  },
  {
    id: "g02",
    schoolId: "sch_riverdale",
    busNumber: "11",
    registrationNumber: "HR26DK8841",
    driverName: "Rafiq Ahmed",
    driverPhone: "9810022233",
    attendantName: "Kavita Sharma",
    capacity: 30,
    currentOccupancy: 18,
    currentSpeedKmH: 12,
    status: "delayed",
    latitude: 28.408,
    longitude: 77.05,
    lastUpdated: MORNING,
    routeId: "r_sohna",
    ownership: "contracted",
    vendor: "Yamuna Fleet",
    progress: 0.45,
    delayMinutes: 9,
    note: "Slow crawl on Sohna Road.",
    insuranceExpiry: "2026-11-18",
    fitnessExpiry: "2027-01-30",
    currentStop: "Vatika Chowk",
    nextStop: "Sector 48",
  },
  {
    id: "g03",
    schoolId: "sch_riverdale",
    busNumber: "06",
    registrationNumber: "HR55AB1022",
    driverName: "Yogesh Yadav",
    driverPhone: "9810033344",
    attendantName: "Pooja Rani",
    capacity: 32,
    currentOccupancy: 25,
    currentSpeedKmH: 30,
    status: "on-time",
    latitude: 28.4292,
    longitude: 77.066,
    lastUpdated: MORNING,
    routeId: "r_gc",
    ownership: "owned",
    progress: 0.72,
    insuranceExpiry: "2028-03-12",
    fitnessExpiry: "2027-09-09",
    currentStop: "Sector 46",
    nextStop: "Campus Gate",
  },
  {
    id: "g04",
    schoolId: "sch_riverdale",
    busNumber: "02",
    registrationNumber: "HR26T9011",
    driverName: "Naresh Kumar",
    driverPhone: "9810044455",
    attendantName: "Meena Kumari",
    capacity: 28,
    currentOccupancy: 14,
    currentSpeedKmH: 0,
    status: "stopped",
    latitude: 28.4058,
    longitude: 77.0488,
    lastUpdated: MORNING,
    routeId: "r_sohna",
    ownership: "contracted",
    vendor: "Yamuna Fleet",
    progress: 0.28,
    note: "Flat tyre at Vatika Chowk. Spare is 12 minutes out.",
    insuranceExpiry: "2026-10-28",
    fitnessExpiry: "2026-12-12",
    currentStop: "Vatika Chowk",
    nextStop: "Sector 48",
  },
  {
    id: "m01",
    schoolId: "sch_stthomas",
    busNumber: "08",
    registrationNumber: "MH02EF4410",
    driverName: "Santosh Kadam",
    driverPhone: "9820010101",
    attendantName: "Lata Pawar",
    capacity: 36,
    currentOccupancy: 22,
    currentSpeedKmH: 24,
    status: "on-time",
    latitude: 19.138,
    longitude: 72.82,
    lastUpdated: MORNING,
    routeId: "r_lok",
    ownership: "owned",
    progress: 0.36,
    insuranceExpiry: "2027-07-07",
    fitnessExpiry: "2027-02-02",
    currentStop: "Lokhandwala Circle",
    nextStop: "Four Bungalows",
  },
  {
    id: "m02",
    schoolId: "sch_stthomas",
    busNumber: "14",
    registrationNumber: "MH02EF7781",
    driverName: "Irfan Shaikh",
    driverPhone: "9820020202",
    attendantName: "Surekha More",
    capacity: 34,
    currentOccupancy: 19,
    currentSpeedKmH: 14,
    status: "delayed",
    latitude: 19.12,
    longitude: 72.868,
    lastUpdated: MORNING,
    routeId: "r_jvlr",
    ownership: "contracted",
    vendor: "Konkan Transit",
    progress: 0.33,
    delayMinutes: 7,
    note: "Signal failure at JVLR.",
    insuranceExpiry: "2027-10-10",
    fitnessExpiry: "2026-11-25",
    currentStop: "JVLR Junction",
    nextStop: "Marol Depot",
  },
  {
    id: "m03",
    schoolId: "sch_stthomas",
    busNumber: "05",
    registrationNumber: "MH01AB2290",
    driverName: "Peter D'Souza",
    driverPhone: "9820030303",
    attendantName: "Anita Lopes",
    capacity: 30,
    currentOccupancy: 11,
    currentSpeedKmH: 0,
    status: "sos",
    latitude: 19.1102,
    longitude: 72.8505,
    lastUpdated: MORNING,
    routeId: "r_jvlr",
    ownership: "contracted",
    vendor: "Konkan Transit",
    progress: 0.66,
    note: "Emergency button at Marol. Campus has been notified.",
    insuranceExpiry: "2026-11-11",
    fitnessExpiry: "2027-06-06",
    currentStop: "Marol Depot",
    nextStop: "Campus Gate",
  },
  {
    id: "m04",
    schoolId: "sch_stthomas",
    busNumber: "19",
    registrationNumber: "MH02CD6602",
    driverName: "Raju Yadav",
    driverPhone: "9820040404",
    attendantName: "Sheetal Jain",
    capacity: 36,
    currentOccupancy: 28,
    currentSpeedKmH: 32,
    status: "on-time",
    latitude: 19.129,
    longitude: 72.827,
    lastUpdated: MORNING,
    routeId: "r_lok",
    ownership: "owned",
    progress: 0.7,
    insuranceExpiry: "2028-02-02",
    fitnessExpiry: "2027-12-01",
    currentStop: "Four Bungalows",
    nextStop: "Campus Gate",
  },
];

type StudentSeed = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  Student["status"],
  string,
  Student["feeStatus"],
  number,
];

function studentsFrom(schoolId: string, rows: StudentSeed[]): Student[] {
  return rows.map((row, index) => ({
    id: row[0],
    schoolId,
    name: row[1],
    grade: row[2],
    parentName: row[3],
    parentPhone: row[4],
    stopName: row[5],
    busId: row[6],
    status: row[7],
    boardingTime: row[8] || undefined,
    feeStatus: row[9],
    feeAmount: row[10],
    admissionNo: `${schoolId === "sch_nalanda" ? "NVN" : schoolId === "sch_riverdale" ? "RPS" : "STA"}-${String(2400 + index)}`,
  }));
}

export const students: Student[] = [
  ...studentsFrom("sch_nalanda", [
    ["stu_arnav", "Arnav Mehta", "4-A", "Meera Mehta", "9845012201", "AECS Layout", "b12", "boarded", "07:18", "paid", 2800],
    ["stu_ananya", "Ananya Iyer", "7-B", "Lakshmi Iyer", "9845023302", "Brookefield", "b12", "boarded", "07:09", "paid", 3200],
    ["stu_vihaan", "Vihaan Reddy", "2-C", "Karthik Reddy", "9845034403", "Graphite Signal", "b12", "boarded", "07:24", "pending", 2600],
    ["stu_myra", "Myra Kapoor", "9-A", "Neha Kapoor", "9845045504", "ITPL Main Gate", "b12", "pending", "", "overdue", 4100],
    ["stu_kabir", "Kabir Nair", "6-B", "Arun Nair", "9845056605", "Kundalahalli Gate", "b12", "absent", "", "paid", 3000],
    ["stu_sara", "Sara D'Souza", "5-A", "Fiona D'Souza", "9845067706", "Marathahalli Bridge", "b21", "boarded", "06:58", "paid", 3600],
    ["stu_advait", "Advait Rao", "11-C", "Srinivas Rao", "9845078807", "Vydehi Circle", "b21", "arrived", "07:41", "paid", 3900],
    ["stu_ishaan", "Ishaan Malhotra", "3-B", "Pooja Malhotra", "9845089908", "AECS Layout", "b21", "boarded", "07:16", "pending", 2400],
    ["stu_diya", "Diya Menon", "8-A", "Rekha Menon", "9900101010", "Bellandur Gate", "b07", "boarded", "07:02", "paid", 4200],
    ["stu_reyansh", "Reyansh Shah", "1-A", "Amit Shah", "9900112121", "Panathur", "b07", "boarded", "07:21", "paid", 3000],
    ["stu_aanya", "Aanya Krishnan", "10-B", "Divya Krishnan", "9900123232", "Varthur Kodi", "b07", "pending", "", "overdue", 4500],
    ["stu_vivaan", "Vivaan Gupta", "4-B", "Nidhi Gupta", "9900134343", "Gunjur Palya", "b07", "absent", "", "pending", 3400],
    ["stu_anika", "Anika Bose", "6-A", "Rohan Bose", "9810010101", "Kadubeesanahalli", "b02", "arrived", "07:46", "paid", 3800],
    ["stu_aarav", "Aarav Pillai", "12-A", "Suresh Pillai", "9810021212", "Hope Farm", "b02", "boarded", "07:33", "paid", 4600],
    ["stu_kiara", "Kiara Joshi", "2-A", "Pallavi Joshi", "9810032323", "Seegehalli", "b18", "boarded", "06:52", "paid", 2700],
    ["stu_shaurya", "Shaurya Banerjee", "5-C", "Anirban Banerjee", "9810043434", "Kadugodi", "b18", "boarded", "07:04", "pending", 3100],
    ["stu_navya", "Navya Reddy", "7-A", "Harini Reddy", "9810054545", "Whitefield Club", "b18", "pending", "", "paid", 2900],
    ["stu_arjun", "Arjun Deshmukh", "9-B", "Sanjay Deshmukh", "9810065656", "Vydehi Hospital", "b03", "absent", "", "overdue", 4000],
    ["stu_meera", "Meera Kulkarni", "3-A", "Aditi Kulkarni", "9810076767", "Kadugodi", "b03", "pending", "", "pending", 2500],
    ["stu_dev", "Dev Patel", "8-C", "Bharat Patel", "9810087878", "Varthur Market", "b09", "boarded", "07:11", "paid", 3300],
    ["stu_saanvi", "Saanvi Chopra", "4-C", "Ritu Chopra", "9810098989", "Siddapura", "b09", "boarded", "07:19", "paid", 2800],
    ["stu_zara", "Zara Qureshi", "11-A", "Imran Qureshi", "9820011111", "Thubarahalli", "b15", "pending", "", "pending", 3700],
    ["stu_atharv", "Atharv Bhat", "6-C", "Shalini Bhat", "9820021212", "Spice Garden", "b15", "boarded", "07:28", "paid", 3000],
    ["stu_inaaya", "Inaaya Khan", "1-B", "Farah Khan", "9820032323", "Varthur Market", "b09", "absent", "", "paid", 2200],
  ]),
  ...studentsFrom("sch_riverdale", [
    ["stu_ayaan", "Ayaan Bhardwaj", "5-A", "Sunita Bhardwaj", "9811110001", "Sector 56", "g01", "boarded", "07:12", "paid", 3100],
    ["stu_myrakh", "Myra Khanna", "8-B", "Rakesh Khanna", "9811110002", "Wazirabad", "g01", "pending", "", "pending", 3400],
    ["stu_kabira", "Kabir Anand", "3-A", "Neelam Anand", "9811110003", "Sector 46", "g03", "arrived", "07:38", "paid", 2600],
    ["stu_navyag", "Navya Grover", "6-C", "Amit Grover", "9811110004", "Badshahpur", "g02", "boarded", "07:08", "paid", 3900],
    ["stu_reyanshm", "Reyansh Malik", "9-A", "Pooja Malik", "9811110005", "Vatika Chowk", "g02", "absent", "", "overdue", 4200],
    ["stu_anvic", "Anvi Chauhan", "2-B", "Deepa Chauhan", "9811110006", "Sector 48", "g04", "pending", "", "pending", 2400],
    ["stu_vivaans", "Vivaan Sethi", "7-A", "Gaurav Sethi", "9811110007", "Sector 56", "g03", "boarded", "07:14", "paid", 3300],
    ["stu_ishitab", "Ishita Bajaj", "4-B", "Rohit Bajaj", "9811110008", "Wazirabad", "g01", "boarded", "07:20", "overdue", 3000],
  ]),
  ...studentsFrom("sch_stthomas", [
    ["stu_aaravf", "Aarav Fernandes", "4-A", "Maria Fernandes", "9821010001", "Versova Jetty", "m01", "boarded", "07:06", "paid", 3600],
    ["stu_sarad", "Sara D'Mello", "6-B", "Craig D'Mello", "9821010002", "Lokhandwala Circle", "m01", "boarded", "07:16", "paid", 3400],
    ["stu_ishaanp", "Ishaan Parekh", "8-A", "Hetal Parekh", "9821010003", "Four Bungalows", "m04", "arrived", "07:44", "pending", 3800],
    ["stu_diyam", "Diya Mehta", "2-C", "Kunal Mehta", "9821010004", "SEEPZ Gate", "m02", "boarded", "06:58", "paid", 4100],
    ["stu_kabirs", "Kabir Shah", "10-A", "Nirali Shah", "9821010005", "JVLR Junction", "m02", "pending", "", "overdue", 4500],
    ["stu_ananyak", "Ananya Kamat", "5-B", "Savio Kamat", "9821010006", "Marol Depot", "m03", "absent", "", "paid", 3200],
    ["stu_vihaand", "Vihaan Desai", "7-C", "Asha Desai", "9821010007", "Versova Jetty", "m04", "boarded", "07:05", "paid", 3000],
    ["stu_myral", "Myra Lobo", "3-A", "Elaine Lobo", "9821010008", "Lokhandwala Circle", "m01", "pending", "", "pending", 2700],
  ]),
];

const LICENSE_EXPIRY = [
  "2028-08-14",
  "2026-11-12",
  "2027-03-01",
  "2026-09-30",
  "2029-01-19",
  "2027-12-02",
  "2026-11-02",
  "2028-02-11",
  "2027-07-18",
  "2028-11-09",
  "2026-12-15",
  "2027-05-22",
  "2028-04-02",
  "2026-10-20",
  "2027-09-01",
  "2028-06-16",
];

const STATE_CODE: Record<string, string> = {
  sch_nalanda: "KA",
  sch_riverdale: "HR",
  sch_stthomas: "MH",
};

function daysFrom(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const [ty, tm, td] = [2026, 10, 26];
  return Math.round((Date.UTC(year, month - 1, day) - Date.UTC(ty, tm - 1, td)) / 86_400_000);
}

export const drivers: Driver[] = buses.flatMap((bus, index) => {
  const state = STATE_CODE[bus.schoolId] ?? "KA";
  const driverExpiry = LICENSE_EXPIRY[index % LICENSE_EXPIRY.length];
  const attendantExpiry = LICENSE_EXPIRY[(index + 5) % LICENSE_EXPIRY.length];
  const driverVerification = daysFrom(driverExpiry) < 0 ? "expired" : index % 9 === 0 ? "pending" : "verified";
  const attendantVerification = daysFrom(attendantExpiry) < 0 ? "expired" : index % 8 === 3 ? "pending" : "verified";
  return [
    {
      id: `${bus.id}-drv`,
      schoolId: bus.schoolId,
      name: bus.driverName,
      phone: bus.driverPhone,
      role: "driver" as const,
      licenseNumber: `${state}-${2022 + (index % 4)}-${String(100000 + index * 97).padStart(6, "0")}`,
      licenseExpiry: driverExpiry,
      badgeExpiry: "2027-06-30",
      policeVerification: driverVerification,
      busId: bus.id,
    },
    {
      id: `${bus.id}-att`,
      schoolId: bus.schoolId,
      name: bus.attendantName,
      phone: String(9700000000 + index * 137),
      role: "attendant" as const,
      licenseNumber: `AT-${state}-${String(1400 + index)}`,
      licenseExpiry: attendantExpiry,
      badgeExpiry: attendantExpiry,
      policeVerification: attendantVerification,
      busId: bus.id,
    },
  ];
});

export const broadcastTemplates: BroadcastTemplate[] = [
  {
    id: "delay-r4",
    title: "15-min Traffic Delay on Route 4",
    audience: "route:r04",
    body: "Bus service on Route 4 is running about 15 minutes late because of traffic. Please do not send students to the stop early. The revised approach will show on the live map.",
  },
  {
    id: "breakdown",
    title: "Vehicle Breakdown — Replacement Dispatched",
    audience: "route:r12",
    body: "A vehicle has stopped and a replacement bus has been dispatched. Students remain with the attendant. Expect a revised pickup window, and do not arrange a separate cab unless the school asks.",
  },
  {
    id: "rain",
    title: "School-wide Heavy Rain Notice",
    audience: "all-parents",
    body: "Heavy rain is affecting several corridors this morning. Buses are running, with extra time built into campus arrival. The gate will receive students as they come in.",
  },
];

export const seedBroadcasts: BroadcastRecord[] = [
  {
    id: "bc_seed_1",
    schoolId: "sch_nalanda",
    title: "15-min Traffic Delay on Route 4",
    body: broadcastTemplates[0].body,
    channels: ["whatsapp", "push"],
    audience: "Route R-04 · ITPL Corridor",
    sentAt: "2026-10-26T07:06:00+05:30",
    recipients: 186,
  },
];

export function busById(id: string) {
  return buses.find((bus) => bus.id === id);
}

export function routeById(id: string) {
  return routes.find((route) => route.id === id);
}

export function schoolById(id: string) {
  return schools.find((school) => school.id === id) ?? schools[0];
}
