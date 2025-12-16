import { Header } from "@/components/Header";
import Link from "next/link";
import styles from "./page.module.css";
import { MomentButtonLink } from "@/components/MomentButtonLink";

export default async function NewMomentPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className={styles.title}>Seleccioná un momento</h1>
        <ul className={styles.momentList}>
          <li>
            <MomentButtonLink href="/new/breakfast" moment="breakfast" />
          </li>
          <li>
            <MomentButtonLink href="/new/lunch" moment="lunch" />
          </li>
          <li>
            <MomentButtonLink href="/new/dinner" moment="dinner" />
          </li>
        </ul>
      </main>
    </>
  );
}
