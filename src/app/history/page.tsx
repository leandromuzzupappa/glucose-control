import { Header } from "@/components/Header";
import styles from "./page.module.css";
import { HistoryTable } from "@/components/HistoryTable";
import { HistoryClientWrapper } from "@/components/HistoryClientWrapper";
import { supabase } from "@/lib/supabase";
import { HistoryEntry } from "@/components/HistoryTable/HistoryTable.types";
import { updateGlucoseEntry } from "./actions";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const { data, error } = await supabase
    .from("glucose_records")
    .select("id, date, meal_type, glucose_level, created_at")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching glucose records:", error);
  }

  const entries: HistoryEntry[] = (data || []).map((record) => ({
    id: String(record.id),
    date: record.date,
    mealType: record.meal_type,
    glucoseLevel: record.glucose_level,
    _createdAt: record.created_at,
  }));

  const handleUpdate = async (
    id: string,
    glucoseLevel: number,
    mealType: string,
    date: string
  ) => {
    "use server";
    return updateGlucoseEntry({
      id,
      glucoseLevel,
      mealType: mealType as any,
      date,
    });
  };

  return (
    <HistoryClientWrapper>
      <Header />
      <main>
        <h1>Historial</h1>
        <HistoryTable
          className={styles.historyTable}
          data={entries}
          onUpdate={handleUpdate}
        />
      </main>
    </HistoryClientWrapper>
  );
}
