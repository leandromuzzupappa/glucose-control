import styles from "./Welcome.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { WelcomeProps } from "./Welcome.types";
import { useWelcome } from "./Welcome.hooks";
import { getDateTime } from "./Welcome.utils";
import Link from "next/link";

export const Welcome = ({ className }: WelcomeProps): ReactElement => {
  const { foo } = useWelcome();
  const { date, time } = getDateTime();

  return (
    <div className={classNames(styles.welcome, className)}>
      <h1 className={styles.title}>Hola Clara!</h1>

      <p className={styles.dateInfo}>
        Hoy es <span>{date}</span> y son las <span>{time}</span> horas.
      </p>

      <h2 className={styles.subtitle}>¿Qué queres hacer hoy?</h2>

      <ul className={styles.optionsList}>
        <li>
          <Link href="new" className={styles.option}>
            Registrar una nueva medición
          </Link>
        </li>
        <li>
          <Link href="history" className={styles.option}>
            Revisar todos mis niveles de glucosa
          </Link>
        </li>
      </ul>
    </div>
  );
};
