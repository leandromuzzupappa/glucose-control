import styles from "./page.module.css";
import { Welcome } from "@/components/Welcome";
import classNames from "classnames";

export default function Home() {
  return (
    <main className={classNames(styles.main)}>
      <Welcome />
    </main>
  );
}
