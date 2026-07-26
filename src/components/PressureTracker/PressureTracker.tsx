"use client";

import { FormEvent, useState } from "react";
import { BloodPressurePeriod } from "@/types/bloodPressureTypes";
import styles from "./PressureTracker.module.css";

type PressureTrackerProps = {
  period: BloodPressurePeriod;
};

const periodNames: Record<BloodPressurePeriod, string> = {
  morning: "mañana",
  afternoon: "tarde",
  night: "noche",
};

const getLocalDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

export const PressureTracker = ({ period }: PressureTrackerProps) => {
  const [date, setDate] = useState(getLocalDate);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/blood-pressure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          period,
          systolic: Number(systolic),
          diastolic: Number(diastolic),
          pulse: Number(pulse),
        }),
      });

      if (!response.ok) throw new Error("Failed to save measurement");

      setSystolic("");
      setDiastolic("");
      setPulse("");
      setMessage("Medición guardada.");
    } catch (error) {
      console.error("Error saving blood pressure measurement:", error);
      setMessage("No se pudo guardar. Probá de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Presión de la {periodNames[period]}</h1>
      <p className={styles.intro}>Registrá tu medición.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="measurement-date">
          Fecha
        </label>
        <input
          className={styles.input}
          id="measurement-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <label className={styles.label} htmlFor="systolic">
          Sistólica
        </label>
        <input
          className={styles.input}
          id="systolic"
          type="number"
          inputMode="numeric"
          min="1"
          value={systolic}
          onChange={(event) => setSystolic(event.target.value)}
          required
        />

        <label className={styles.label} htmlFor="diastolic">
          Diastólica
        </label>
        <input
          className={styles.input}
          id="diastolic"
          type="number"
          inputMode="numeric"
          min="1"
          value={diastolic}
          onChange={(event) => setDiastolic(event.target.value)}
          required
        />

        <label className={styles.label} htmlFor="pulse">
          Pulso
        </label>
        <input
          className={styles.input}
          id="pulse"
          type="number"
          inputMode="numeric"
          min="1"
          value={pulse}
          onChange={(event) => setPulse(event.target.value)}
          required
        />

        <button className={styles.submit} type="submit" disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar medición"}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </main>
  );
};