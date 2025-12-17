import { Header } from "@/components/Header";
import { MealTracker } from "@/components/MealTracker";
import { MealType } from "@/types/glucoseTypes";

type MomentPageProps = {
  params: Promise<{
    moment: MealType;
  }>;
};

export const MomentPage = async ({ params }: MomentPageProps) => {
  const { moment } = await params;

  return (
    <>
      <Header />
      <main>
        <MealTracker moment={moment} />
      </main>
    </>
  );
};

export default MomentPage;
