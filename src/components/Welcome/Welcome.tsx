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
      <h1>Hola Clara!</h1>

      <p>
        Hoy es {date} y son las {time} horas.
      </p>

      <h2>Qué quieres hacer hoy?</h2>

      <ul>
        <li>
          <Link href="new">Registrar una nueva medición</Link>
        </li>
        <li>
          <Link href="history">Revisar todos mis niveles de glucosa</Link>
        </li>
      </ul>
    </div>
  );
};
