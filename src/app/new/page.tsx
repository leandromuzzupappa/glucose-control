import { Header } from "@/components/Header";
import Link from "next/link";

export default async function NewMomentPage() {
  return (
    <>
      <Header />
      <main>
        <h1>Seleccioná un momento</h1>
        <ul>
          <li>
            <Link href="/new/breakfast">Desayuno</Link>
          </li>
          <li>
            <Link href="/new/lunch">Almuerzo</Link>
          </li>
          <li>
            <Link href="/new/dinner">Cena</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
