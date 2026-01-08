import { NextRequest, NextResponse } from "next/server";
import { publicClient } from "@/lib/datocms";
import { GET_ALL_GLUCOSE_RECORDS } from "@/lib/datocms/queries";
import { GlucoseRecord, GlucoseRecordInput } from "@/types/glucoseTypes";

export async function GET() {
  try {
    const data = await publicClient.request(GET_ALL_GLUCOSE_RECORDS);
    console.log("Fetched glucose records:", data);

    const response = NextResponse.json(data.allGlucoseRecords || []);
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

    console.log("Creating record:", {
      date: body.date,
      mealType: body.mealType,
      glucoseLevel: body.glucoseLevel,
      timestamp: body.timestamp,
    });

    const modelsResponse = await fetch(
      "https://site-api.datocms.com/item-types",
      {
        headers: {
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
          Accept: "application/json",
          "X-Api-Version": "3",
        },
      }
    );

    if (!modelsResponse.ok) {
      throw new Error(`Failed to fetch models: ${modelsResponse.status}`);
    }

    const modelsData = await modelsResponse.json();
    const glucoseModel = modelsData.data.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (model: any) =>
        model.attributes.api_key === "glucose_record" ||
        model.attributes.name === "Glucose Record"
    );

    if (!glucoseModel) {
      throw new Error(
        "Glucose Record model not found. Please create it in DatoCMS first."
      );
    }

    console.log("Found model:", glucoseModel.id);

    const response = await fetch("https://site-api.datocms.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        "X-Api-Version": "3",
      },
      body: JSON.stringify({
        data: {
          type: "item",
          attributes: {
            date: body.date,
            meal_type: body.mealType,
            glucose_level: parseInt(body.glucoseLevel.toString()),
            timestamp: body.timestamp,
          },
          relationships: {
            item_type: {
              data: {
                type: "item_type",
                id: glucoseModel.id,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData);
      throw new Error(
        `DatoCMS API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data.data);
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
    const { id, ...updateData } =
      (await request.json()) as Partial<GlucoseRecord> & {
        id: string;
      };

    console.log("Updating record with ID:", id, "Data:", updateData);

    const attributes: Record<string, unknown> = {};
    if (updateData.date) attributes.date = updateData.date;
    if (updateData.mealType) attributes.meal_type = updateData.mealType;
    if (updateData.glucoseLevel !== undefined)
      attributes.glucose_level = parseInt(updateData.glucoseLevel.toString());

    const response = await fetch(`https://site-api.datocms.com/items/${id}`, {
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
          id: id,
          attributes: attributes,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DatoCMS API Error:", errorData);
      throw new Error(
        `DatoCMS API error: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error updating glucose record:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}
