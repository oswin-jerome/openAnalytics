import { TrackerOptions, EventPayload, APIPayload } from "./types";

class Tracker {
  private options!: TrackerOptions;
  private sessionId!: string;
  private initialized = false;

  public init(options: TrackerOptions) {
    if (window == undefined) return;
    this.options = options;
    this.sessionId = this.generateSessionId();
    this.initialized = true;
    this.sendPageView();
  }
  sendPageView() {
    this.send({
      name: "page_view",
      page: window.location.href,
      eventType: "page_view",
      url: window.location.href,
    });
  }

  private send(data: EventPayload) {
    if (!this.initialized) return;
    const payload: APIPayload = {
      event: data,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      ipAddress: "127.0.0.1",
    };
    const url = new URL("/api/v1/events", this.options.endpoint);
    url.searchParams.append("x-api-key", this.options.apiKey);

    navigator.sendBeacon(
      url,
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      }),
    );
  }
  generateSessionId(): string {
    return crypto.randomUUID?.() || Math.random().toString(36).substring(2);
  }
}

export const tracker = new Tracker();
