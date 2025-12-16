import { MealType } from "@/types/glucoseTypes";
import { LinkProps } from "next/link";

export type MomentButtonLinkProps = LinkProps & {
  className?: string;
  moment: MealType;
};

export type UseMomentButtonLinkReturnType = {
  foo: string;
};
