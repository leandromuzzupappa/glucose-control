"use server";

import { revalidatePath } from "next/cache";
import { MealType } from "@/types/glucoseTypes";
import { supabase } from "@/lib/supabase";

type ActionResponse = {
  success: boolean;
  error?: string;
};

type UpdateGlucoseEntryInput = {
  id: string;
  glucoseLevel: number;
  mealType: MealType;
  date: string;
};

export async function deleteGlucoseEntry(id: string): Promise<ActionResponse> {
  try {
    const parsedId = Number.parseInt(id, 10);
    const recordId = Number.isNaN(parsedId) ? id : parsedId;

    const { error } = await supabase
      .from("glucose_records")
      .delete()
      .eq("id", recordId);

    if (error) {
      throw error;
    }

    revalidatePath("/history");

    return { success: true };
  } catch (error) {
    console.error("Error deleting glucose record:", error);
    return { success: false, error: "Failed to delete record" };
  }
}

export async function updateGlucoseEntry(
  data: UpdateGlucoseEntryInput
): Promise<ActionResponse> {
  try {
    const parsedId = Number.parseInt(data.id, 10);
    const recordId = Number.isNaN(parsedId) ? data.id : parsedId;

    const { error } = await supabase
      .from("glucose_records")
      .update({
        date: data.date,
        meal_type: data.mealType,
        glucose_level: Number.parseInt(data.glucoseLevel.toString(), 10),
      })
      .eq("id", recordId);

    if (error) {
      throw error;
    }

    revalidatePath("/history");

    return { success: true };
  } catch (error) {
    console.error("Error updating glucose record:", error);
    return { success: false, error: "Failed to update record" };
  }
}
