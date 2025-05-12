import { TrackerOptions, EventPayload, APIPayload } from "./types";
import { detectClient, generateOrUpdateSessionId } from "./utils";

export class Tracker {
  private options!: TrackerOptions;
  private sessionId!: string;
  private initialized = false;

  public init(options: TrackerOptions) {
    if (window == undefined) return;
    this.options = options;
    this.sessionId = generateOrUpdateSessionId();
    this.initialized = true;
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
}

// export let tracker: Tracker | null = null;
// export const initTracker = (options: TrackerOptions) => {
//   const t = new Tracker();
//   tracker = t;
//   tracker.init(options);
//   //   if (window != undefined) window.analytics = tracker;
// };
