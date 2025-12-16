type MomentPageProps = {
  params: Promise<{
    moment: string;
  }>;
};

export const MomentPage = async ({ params }: MomentPageProps) => {
  const { moment } = await params;

  return (
    <div>
      <h1>Creating a new entry for: {moment}</h1>
    </div>
  );
};

export default MomentPage;
