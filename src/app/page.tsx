import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Glucose Control</h1>
      <ul>
        <li>
          <Link href="/new">
            Moment selector
          </Link>
        </li>
        <li>
          <Link href="/history">
            My History
          </Link>
        </li>
      </ul>
    </div>
  );
}
