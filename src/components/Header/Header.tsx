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
      <nav>
        <ul>
          <li>
            <Link href="/">Volver al inicio</Link>
          </li>

          <li>
            {pathname === "/history" ? (
              <Link href="/new">Registrar una nueva medición</Link>
            ) : (
              <Link href="/history">Ver historial de mediciones</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
