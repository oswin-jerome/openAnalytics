// src/tracker.ts
var Tracker = class {
  constructor() {
    this.initialized = false;
  }
  init(options) {
    if (window == void 0) return;
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
      url: window.location.href
    });
  }
  send(data) {
    if (!this.initialized) return;
    const payload = {
      event: data,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      ipAddress: "127.0.0.1"
    };
    const url = new URL("/api/v1/events", this.options.endpoint);
    url.searchParams.append("x-api-key", this.options.apiKey);
    navigator.sendBeacon(
      url,
      new Blob([JSON.stringify(payload)], {
        type: "application/json"
      })
    );
  }
  generateSessionId() {
    var _a;
    return ((_a = crypto.randomUUID) == null ? void 0 : _a.call(crypto)) || Math.random().toString(36).substring(2);
  }
};
var tracker = new Tracker();

// src/index.ts
if (window != void 0) window.analytics = tracker;
var index_default = tracker;
export {
  index_default as default
};
