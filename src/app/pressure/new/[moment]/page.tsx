import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { PressureTracker } from "@/components/PressureTracker";
import { BloodPressurePeriod } from "@/types/bloodPressureTypes";

type PressureMomentPageProps = {
  params: Promise<{ moment: string }>;
};

const periods: BloodPressurePeriod[] = ["morning", "afternoon", "night"];

export default async function PressureMomentPage({
  params,
}: PressureMomentPageProps) {
  const { moment } = await params;

  if (!periods.includes(moment as BloodPressurePeriod)) notFound();

  return (
    <>
      <Header
        homeHref="/pressure"
        historyHref="/pressure/history"
        newHref="/pressure/new/morning"
      />
      <PressureTracker period={moment as BloodPressurePeriod} />
    </>
  );
}