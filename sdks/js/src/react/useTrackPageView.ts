import { useEffect } from "react";
import { tracker } from "../tracker";
import { EventPayload } from "../types";

export const useTrackPageView = ({ page, metaData, url }: Partial<Pick<EventPayload, "page" | "metaData" | "url">>) => {
  useEffect(() => {
    return () => {
      tracker?.send({
        eventType: "page_view",
        name: "page_view",
        page: page ?? window.location.pathname,
        url: url ?? window.location.href,
        referrer: document.referrer,
        metaData: metaData ?? {},
      });
    };
  }, []);
};
