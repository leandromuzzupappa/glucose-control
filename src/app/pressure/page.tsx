import Link from "next/link";
import { Header } from "@/components/Header";
import { getDateTime } from "@/components/Welcome/Welcome.utils";
import styles from "./page.module.css";

const moments = [
  { href: "/pressure/new/morning", label: "Mañana", period: "morning" },
  {
    href: "/pressure/new/afternoon",
    label: "Tarde",
    period: "afternoon",
  },
  { href: "/pressure/new/night", label: "Noche", period: "night" },
];

export default function PressureHomePage() {
  const { date, time } = getDateTime();

  return (
    <>
      <Header
        homeHref="/pressure"
        historyHref="/pressure/history"
        newHref="/pressure/new/morning"
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Mi presión</h1>
        <p className={styles.dateInfo}>
          Hoy es <span>{date}</span> y son las <span>{time}</span> horas.
        </p>
        <p className={styles.intro}>¿En qué momento te mediste?</p>
        <ul className={styles.momentList}>
          {moments.map((moment) => (
            <li key={moment.href}>
              <Link
                className={styles.momentLink}
                data-period={moment.period}
                href={moment.href}
              >
                {moment.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}