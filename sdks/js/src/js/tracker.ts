import { Tracker } from "../core";
import { EventPayload, TrackerOptions } from "../types";

export const initTracker = (options: TrackerOptions) => {
  const t = new Tracker();
  if (window == undefined) return;
  t.init(options);
  window.analytics = t;
  autoTrackClicks(t);

  if (options.autoTrackPageViews) {
    t.send({
      name: "page_view",
      page: window.location.pathname,
      eventType: "page_view",
      url: window.location.href,
      referrer: document.referrer,
    });
  }
};

export const pushManualEvent = (event: EventPayload) => {
  if (!window.analytics) {
    console.error("Tracker not initialized");
    return;
  }
  window.analytics?.send(event);
};

const autoTrackClicks = (tracker: Tracker) => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const clickable = target.closest("[data-track-click]") as HTMLElement;
    if (!clickable) return;
    const eventType = clickable.getAttribute("data-track-click");
    if (!eventType) return;

    tracker.send({
      name: "click",
      page: window.location.pathname,
      eventType: eventType,
      url: window.location.href,
      referrer: document.referrer,
    });
  });
};
