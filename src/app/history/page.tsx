import { Header } from "@/components/Header";
import styles from "./page.module.css";
import { HistoryTable } from "@/components/HistoryTable";
import { publicClient } from "@/lib/datocms";
import { GET_ALL_GLUCOSE_RECORDS } from "@/lib/datocms/queries";
import { HistoryEntry } from "@/components/HistoryTable/HistoryTable.types";
import { updateGlucoseEntry } from "./actions";

export default async function HistoryPage() {
  const data = await publicClient.request(GET_ALL_GLUCOSE_RECORDS);
  const entries = (data.allGlucoseRecords || []) as HistoryEntry[];

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
    <>
      <Header />
      <main>
        <h1>Historial</h1>
        <HistoryTable
          className={styles.historyTable}
          data={entries}
          onUpdate={handleUpdate}
        />
      </main>
    </>
  );
}
