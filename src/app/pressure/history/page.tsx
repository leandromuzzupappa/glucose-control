import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { BloodPressurePeriod } from "@/types/bloodPressureTypes";
import { formatTableDate } from "@/components/HistoryTable/HistoryTable.utils";
import styles from "./page.module.css";

const periodNames: Record<BloodPressurePeriod, string> = {
  morning: "Mañana",
  afternoon: "Tarde",
  night: "Noche",
};

export const dynamic = "force-dynamic";

export default async function PressureHistoryPage() {
  const { data, error } = await supabase
    .from("blood_pressure_records")
    .select("id, date, period, systolic, diastolic, pulse")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching blood pressure records:", error);

  return (
    <>
      <Header
        homeHref="/pressure"
        historyHref="/pressure/history"
        newHref="/pressure/new/morning"
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Historial de presión</h1>
        {data && data.length > 0 ? (
          <ul className={styles.entries}>
            {data.map((record) => (
              <li className={styles.entry} key={record.id}>
                <p className={styles.date}>
                  {formatTableDate(record.date)} - {periodNames[record.period as BloodPressurePeriod]}
                </p>
                <p className={styles.reading}>
                  {record.systolic}/{record.diastolic} <span>mmHg</span>
                </p>
                <p className={styles.pulse}>Pulso: {record.pulse} lpm</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Todavía no hay mediciones guardadas.</p>
        )}
      </main>
    </>
  );
}