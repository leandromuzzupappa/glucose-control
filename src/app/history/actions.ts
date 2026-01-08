"use server";

import { revalidatePath } from "next/cache";
import { MealType } from "@/types/glucoseTypes";

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
    const response = await fetch(`https://site-api.datocms.com/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        Accept: "application/json",
        "X-Api-Version": "3",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData);
      throw new Error(
        `DatoCMS API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
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
    const response = await fetch(
      `https://site-api.datocms.com/items/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
          "X-Api-Version": "3",
        },
        body: JSON.stringify({
          data: {
            type: "item",
            id: data.id,
            attributes: {
              date: data.date,
              meal_type: data.mealType,
              glucose_level: parseInt(data.glucoseLevel.toString()),
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData);
      throw new Error(
        `DatoCMS API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    revalidatePath("/history");

    return { success: true };
  } catch (error) {
    console.error("Error updating glucose record:", error);
    return { success: false, error: "Failed to update record" };
  }
}
