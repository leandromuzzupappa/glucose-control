import { DayMomentType } from "@/types/glucoseTypes";
import { LinkProps } from "next/link";

export type MomentButtonLinkProps = LinkProps & {
  className?: string;
  moment: DayMomentType;
};

export type UseMomentButtonLinkReturnType = {
  foo: string;
};
