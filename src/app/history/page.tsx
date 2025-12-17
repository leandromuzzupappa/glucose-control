import { Header } from "@/components/Header";
import styles from "./page.module.css";
import { HistoryTable } from "@/components/HistoryTable";
import { HistoryEntry } from "@/components/HistoryTable/HistoryTable.types";

export default function HistoryPage() {
  const data: HistoryEntry[] = [
    {
      mealType: "breakfast",
      glucoseLevel: 99,
      date: "2025-12-15",
      _createdAt: "2025-12-15T19:24:56+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 158,
      date: "2025-12-15",
      _createdAt: "2025-12-15T17:46:56+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 33,
      date: "2025-12-15",
      _createdAt: "2025-12-15T17:45:16+00:00",
    },
    {
      mealType: "breakfast",
      glucoseLevel: 120,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:37:20+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 54,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:34:53+00:00",
    },
    {
      mealType: "lunch",
      glucoseLevel: 25,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:34:45+00:00",
    },
    {
      mealType: "breakfast",
      glucoseLevel: 79,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:34:36+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 79,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:34:15+00:00",
    },
    {
      mealType: "breakfast",
      glucoseLevel: 11,
      date: "2025-12-14",
      _createdAt: "2025-12-14T21:33:55+00:00",
    },
    {
      mealType: "lunch",
      glucoseLevel: 44,
      date: "2025-12-12",
      _createdAt: "2025-12-12T22:23:55+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 55,
      date: "2025-12-12",
      _createdAt: "2025-12-12T06:26:54+00:00",
    },
    {
      mealType: "breakfast",
      glucoseLevel: 69,
      date: "2025-12-12",
      _createdAt: "2025-12-12T06:26:12+00:00",
    },
    {
      mealType: "breakfast",
      glucoseLevel: 132,
      date: "2025-12-01",
      _createdAt: "2025-12-11T19:17:20+00:00",
    },
    {
      mealType: "dinner",
      glucoseLevel: 321,
      date: "2025-11-01",
      _createdAt: "2025-11-01T19:17:20+00:00",
    },
    {
      mealType: "lunch",
      glucoseLevel: 111,
      date: "2025-10-18",
      _createdAt: "2025-10-18T12:17:20+00:00",
    },
  ];

  return (
    <>
      <Header />
      <main>
        <h1>Historial</h1>
        <HistoryTable className={styles.historyTable} data={data} />
      </main>
    </>
  );
}
