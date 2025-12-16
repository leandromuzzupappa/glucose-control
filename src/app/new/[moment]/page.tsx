import Link from "next/link";

type MomentPageProps = {
  params: Promise<{
    moment: string;
  }>;
};

export const MomentPage = async ({ params }: MomentPageProps) => {
  const { moment } = await params;

  return (
    <main>
      <nav>
        <Link href="/new">Volver</Link>
      </nav>
      <h1>Creating a new entry for: {moment}</h1>
    </main>
  );
};

export default MomentPage;
