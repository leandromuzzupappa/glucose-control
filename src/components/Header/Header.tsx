"use client";

import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import classNames from "classnames";
import { ReactElement } from "react";
import { HeaderProps } from "./Header.types";
import { useHeader } from "./Header.hooks";
import Link from "next/link";

export const Header = ({ className }: HeaderProps): ReactElement => {
  const pathname = usePathname();

  console.log("Current pathname:", pathname);

  return (
    <header className={classNames(styles.header, className)}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navItem}>
              Volver al inicio
            </Link>
          </li>

          <li>
            {pathname === "/history" ? (
              <Link href="/new" className={styles.navItem}>
                Registrar una nueva medición
              </Link>
            ) : (
              <Link href="/history" className={styles.navItem}>
                Ver historial de mediciones
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
