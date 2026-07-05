import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GlucoseRecordInput, MealType } from "@/types/glucoseTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRecordToFrontend = (record: any) => ({
  id: record.id.toString(), // Convertimos el ID de Supabase (número) a string
  date: record.date,
  mealType: record.meal_type as MealType,
  glucoseLevel: record.glucose_level,
  _createdAt: record.created_at, 
  createdAt: record.created_at,
});

export async function GET() {
  try {
    // Pedimos todos los registros ordenados por fecha descendente
    const { data, error } = await supabase
      .from("glucose_records")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    console.log(`Fetched ${data?.length} glucose records from Supabase`);

    // Mapeamos los resultados al formato antiguo
    const formattedData = data ? data.map(mapRecordToFrontend) : [];

    const response = NextResponse.json(formattedData);
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching glucose records:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GlucoseRecordInput = await request.json();

    console.log("Creating record in Supabase:", body);

    const { data, error } = await supabase
      .from("glucose_records")
      .insert([
        {
          date: body.date,
          meal_type: body.mealType,
          glucose_level: parseInt(body.glucoseLevel.toString()),
          timestamp: body.timestamp,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(mapRecordToFrontend(data[0]));
  } catch (error) {
    console.error("Error creating glucose record:", error);
    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string };

    console.log("Deleting record with ID:", id);

    const { error } = await supabase
      .from("glucose_records")
      .delete()
      .eq("id", parseInt(id));

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting glucose record:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json();

    console.log("Updating record with ID:", id, "Data:", updateData);

    // Preparamos los datos en formato snake_case para Supabase
    const attributes: Record<string, unknown> = {};
    if (updateData.date) attributes.date = updateData.date;
    if (updateData.mealType) attributes.meal_type = updateData.mealType;
    if (updateData.glucoseLevel !== undefined)
      attributes.glucose_level = parseInt(updateData.glucoseLevel.toString());

    const { data, error } = await supabase
      .from("glucose_records")
      .update(attributes)
      .eq("id", parseInt(id))
      .select();

    if (error) throw error;

    return NextResponse.json(mapRecordToFrontend(data[0]));
  } catch (error) {
    console.error("Error updating glucose record:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}