import styles from "./Welcome.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { WelcomeProps } from "./Welcome.types";
import { getDateTime } from "./Welcome.utils";
import { MomentButtonLink } from "../MomentButtonLink";
import Link from "next/link";

export const Welcome = ({ className }: WelcomeProps): ReactElement => {
  const { date, time } = getDateTime();

  return (
    <div className={classNames(styles.welcome, className)}>
      <h1 className={styles.title}>Hola Clara!</h1>

      <p className={styles.dateInfo}>
        Hoy es <span>{date}</span> y son las <span>{time}</span> horas.
      </p>

      <h2 className={styles.subtitle}>¿Qué queres medir hoy?</h2>

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

        <hr />

        <li>
          <Link href="history" className={styles.option}>
            Ver todo mi historial
          </Link>
        </li>
      </ul>
    </div>
  );
};
