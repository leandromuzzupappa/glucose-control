"use client";

import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { HeaderProps } from "./Header.types";
import Link from "next/link";

export const Header = ({
  className,
  homeHref = "/",
  historyHref = "/history",
  newHref = "/new",
}: HeaderProps): ReactElement => {
  const pathname = usePathname();

  return (
    <header className={classNames(styles.header, className)}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href={homeHref} className={styles.navItem}>
              Volver al inicio
            </Link>
          </li>

          <li>
            {pathname === historyHref ? (
              <Link href={newHref} className={styles.navItem}>
                Registrar una nueva medición
              </Link>
            ) : (
              <Link href={historyHref} className={styles.navItem}>
                Ver historial de mediciones
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
