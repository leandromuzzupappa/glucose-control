"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useHistoryRevalidation() {
  const router = useRouter();

  const revalidateHistory = useCallback(() => {
    router.refresh();

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "REVALIDATE_HISTORY",
      });
    }
  }, [router]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
    }

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (
        event.data.type === "APP_FOCUSED" &&
        event.data.action === "REVALIDATE_HISTORY"
      ) {
        revalidateHistory();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        revalidateHistory();
      }
    };

    const handleFocus = () => {
      revalidateHistory();
    };

    const handleOnline = () => {
      revalidateHistory();
    };

    const handleRefresh = () => {
      revalidateHistory();
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage
      );
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("online", handleOnline);
    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener(
          "message",
          handleServiceWorkerMessage
        );
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, [revalidateHistory]);

  return { revalidateHistory };
}
