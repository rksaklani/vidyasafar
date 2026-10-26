export type RoiInput = {
  buses: number;
  students: number;
};

export type RoiResult = {
  frontDeskHours: number;
  callsAvoided: number;
  digitalFeeAdoption: number;
  litresSaved: number;
  fuelSavingsInr: number;
  assumptions: string[];
};

const SCHOOL_DAYS = 22;
const CALLS_PER_STUDENT_PER_DAY = 0.35;
const MINUTES_PER_CALL = 3.5;
const CALL_REDUCTION = 0.72;
const KM_PER_BUS_PER_DAY = 42;
const KM_PER_LITRE = 5.5;
const FUEL_PRICE_INR = 102;
const ROUTE_SAVING = 0.11;

export function calculateRoi({ buses, students }: RoiInput): RoiResult {
  const callsAvoided = Math.round(students * CALLS_PER_STUDENT_PER_DAY * SCHOOL_DAYS * CALL_REDUCTION);
  const frontDeskHours =
    (students * CALLS_PER_STUDENT_PER_DAY * SCHOOL_DAYS * MINUTES_PER_CALL * CALL_REDUCTION) / 60;
  const digitalFeeAdoption = Math.min(96, Math.round(36 + students / 48));
  const litresSaved = (buses * KM_PER_BUS_PER_DAY * SCHOOL_DAYS * ROUTE_SAVING) / KM_PER_LITRE;
  const fuelSavingsInr = litresSaved * FUEL_PRICE_INR;

  return {
    frontDeskHours,
    callsAvoided,
    digitalFeeAdoption,
    litresSaved,
    fuelSavingsInr,
    assumptions: [
      `${SCHOOL_DAYS} school days, ${CALLS_PER_STUDENT_PER_DAY} front-desk calls per student per day, ${MINUTES_PER_CALL} minutes each.`,
      `${Math.round(CALL_REDUCTION * 100)}% of those calls drop once boarding and the live map are visible to parents.`,
      `Each bus runs about ${KM_PER_BUS_PER_DAY} km a day. Sequenced routes hold back ${Math.round(ROUTE_SAVING * 100)}% of fuel at ${KM_PER_LITRE} km/l and ₹${FUEL_PRICE_INR}/l.`,
      "Fee adoption is the share of families paying the October cycle in the parent app instead of cash on the seat.",
    ],
  };
}
