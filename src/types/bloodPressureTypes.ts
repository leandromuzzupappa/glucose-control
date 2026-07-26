export type BloodPressurePeriod = "morning" | "afternoon" | "night";

export interface BloodPressureRecordInput {
  date: string;
  period: BloodPressurePeriod;
  systolic: number;
  diastolic: number;
  pulse: number;
}