import { Header } from "@/components/Header";
import { MealTracker } from "@/components/MealTracker";

type MomentPageProps = {
  params: Promise<{
    moment: string;
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
