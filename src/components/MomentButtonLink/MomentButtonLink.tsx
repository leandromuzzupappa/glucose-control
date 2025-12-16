import styles from "./MomentButtonLink.module.css";
import classNames from "classnames";
import Link from "next/link";
import { ReactElement } from "react";
import { MomentButtonLinkProps } from "./MomentButtonLink.types";
import { useMomentButtonLink } from "./MomentButtonLink.hooks";
import { DayMomentSpanishEnum } from "@/types/glucoseTypes";

export const MomentButtonLink = ({
  href,
  moment,
  className,
}: MomentButtonLinkProps): ReactElement => {
  const { foo } = useMomentButtonLink();

  return (
    <>
      <Link
        className={classNames(styles.momentButtonLink, className)}
        href={href}
        data-moment={moment}
      >
        {DayMomentSpanishEnum[moment]}
      </Link>
    </>
  );
};
