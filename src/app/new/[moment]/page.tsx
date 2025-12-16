import { Header } from "@/components/Header";

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
        <h1>{moment}</h1>
      </main>
    </>
  );
};

export default MomentPage;
