"use client";

import { useHistoryRevalidation } from "@/hooks/useHistoryRevalidation";
import { useEffect } from "react";

interface HistoryClientWrapperProps {
  children: React.ReactNode;
}

export function HistoryClientWrapper({ children }: HistoryClientWrapperProps) {
  const { revalidateHistory } = useHistoryRevalidation();

  useEffect(() => {
    revalidateHistory();
  }, [revalidateHistory]);

  return <>{children}</>;
}
