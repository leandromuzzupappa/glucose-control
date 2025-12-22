import { Header } from "@/components/Header";
import styles from "./page.module.css";
import { HistoryTable } from "@/components/HistoryTable";
import { publicClient } from "@/lib/datocms";
import { GET_ALL_GLUCOSE_RECORDS } from "@/lib/datocms/queries";

export default async function HistoryPage() {
  const data = await publicClient.request(GET_ALL_GLUCOSE_RECORDS);
  const entries = data.allGlucoseRecords || [];

  return (
    <>
      <Header />
      <main>
        <h1>Historial</h1>
        <HistoryTable className={styles.historyTable} data={entries} />
      </main>
    </>
  );
}
