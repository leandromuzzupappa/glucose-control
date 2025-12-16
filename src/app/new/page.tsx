import { Header } from "@/components/Header";
import Link from "next/link";

export default async function NewMomentPage() {
  return (
    <>
      <Header />
      <main>
        <h1>Select a moment</h1>
        <ul>
          <li>
            <Link href="/new/breakfast">Breakfast</Link>
          </li>
          <li>
            <Link href="/new/lunch">Lunch</Link>
          </li>
          <li>
            <Link href="/new/dinner">Dinner</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
