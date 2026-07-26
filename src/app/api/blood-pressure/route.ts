import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  BloodPressurePeriod,
  BloodPressureRecordInput,
} from "@/types/bloodPressureTypes";

const periods: BloodPressurePeriod[] = ["morning", "afternoon", "night"];

const isPositiveInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blood_pressure_records")
      .select("id, date, period, systolic, diastolic, pulse, created_at")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching blood pressure records:", error);
    return NextResponse.json(
      { error: "Failed to fetch blood pressure records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BloodPressureRecordInput = await request.json();

    if (
      !body.date ||
      !periods.includes(body.period) ||
      !isPositiveInteger(body.systolic) ||
      !isPositiveInteger(body.diastolic) ||
      !isPositiveInteger(body.pulse)
    ) {
      return NextResponse.json(
        { error: "Invalid blood pressure measurement" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("blood_pressure_records")
      .insert({
        date: body.date,
        period: body.period,
        systolic: body.systolic,
        diastolic: body.diastolic,
        pulse: body.pulse,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating blood pressure record:", error);
    return NextResponse.json(
      { error: "Failed to create blood pressure record" },
      { status: 500 }
    );
  }
}