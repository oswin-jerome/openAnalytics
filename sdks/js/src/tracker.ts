import { TrackerOptions, EventPayload, APIPayload } from "./types";
import { detectClient } from "./utils";

class Tracker {
  private options!: TrackerOptions;
  private sessionId!: string;
  private initialized = false;

  public init(options: TrackerOptions) {
    if (window == undefined) return;
    this.options = options;
    this.sessionId = this.generateOrUpdateSessionId();
    this.initialized = true;
    if (this.options.autoTrackPageViews) {
      this.sendPageView();
    }

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("[data-track-click]") as HTMLElement;
      if (!clickable) return;
      const eventType = clickable.getAttribute("data-track-click");
      if (!eventType) return;
      this.send({
        name: "click",
        page: window.location.pathname,
        eventType: eventType,
        url: window.location.href,
        referrer: document.referrer,
      });
      console.log("click", clickable);
      //
    });
  }
  sendPageView() {
    this.send({
      name: "page_view",
      page: window.location.pathname,
      eventType: "page_view",
      url: window.location.href,
      referrer: document.referrer,
    });
  }

  send(data: EventPayload) {
    if (!this.initialized) return;
    const { browser, device, os, version } = detectClient();
    const payload: APIPayload = {
      event: data,
      sessionId: this.sessionId,
      userAgent: browser.toString(),
      ipAddress: "127.0.0.1",
      metaData: { device, os, version },
    };
    const url = new URL("/api/v1/events", this.options.endpoint);
    url.searchParams.append("x-api-key", this.options.apiKey);

    navigator.sendBeacon(
      url,
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      }),
    );
    localStorage.setItem("lastEvent", Date.now().toString());
  }
  generateSessionId(): string {
    return crypto.randomUUID?.() || Math.random().toString(36).substring(2);
  }

  generateOrUpdateSessionId() {
    const now = Date.now();
    const lastEvent = parseInt(localStorage.getItem("lastEvent") || "0", 10);
    const existingSessionId = localStorage.getItem("sessionId");

    const isValid = existingSessionId && now - lastEvent < 5 * 60 * 1000;

    if (isValid) {
      localStorage.setItem("lastEvent", now.toString());
      return existingSessionId;
    }

    const newSessionId = this.generateSessionId();
    localStorage.setItem("sessionId", newSessionId);
    localStorage.setItem("lastEvent", now.toString());
    return newSessionId;
  }
}

export let tracker: Tracker | null = null;
export const initTracker = (options: TrackerOptions) => {
  const t = new Tracker();
  tracker = t;
  tracker.init(options);
  if (window != undefined) window.analytics = tracker;
};
