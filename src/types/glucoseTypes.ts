export type MealType = "breakfast" | "lunch" | "dinner";

export enum MealTypeSpanishEnum {
  breakfast = "Desayuno",
  lunch = "Almuerzo",
  dinner = "Cena",
}

export interface GlucoseRecord {
  id: string;
  date: string;
  mealType: MealType;
  glucoseLevel: number;
  createdAt?: string;
  _createdAt?: string;
}

export interface GlucoseRecordInput {
  date: string;
  mealType: MealType;
  glucoseLevel: string | number;
  timestamp: string;
}