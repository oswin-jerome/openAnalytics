"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  analytics: () => analytics,
  useTrackPageView: () => useTrackPageView
});
module.exports = __toCommonJS(index_exports);

// src/utils.ts
function detectClient() {
  const ua = navigator.userAgent;
  const browsers = [
    [/Edg\/(\d+)/, "Edge"],
    [/OPR\/(\d+)/, "Opera"],
    [/Chrome\/(\d+)/, "Chrome"],
    [/Firefox\/(\d+)/, "Firefox"],
    [/Version\/(\d+).+Safari/, "Safari"]
  ];
  let browser = "Unknown";
  let version = "";
  for (const [regex, name] of browsers) {
    const match = ua.match(regex);
    if (match) {
      browser = name;
      version = match[1];
      break;
    }
  }
  let os = "Unknown";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";
  let device = "desktop";
  if (/Mobi|Android/i.test(ua)) device = "mobile";
  else if (/iPad/.test(ua) || navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) device = "tablet";
  return { browser, version, os, device };
}

// src/tracker.ts
var Tracker = class {
  constructor() {
    this.initialized = false;
  }
  init(options) {
    if (window == void 0) return;
    this.options = options;
    this.sessionId = this.generateOrUpdateSessionId();
    this.initialized = true;
    this.sendPageView();
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickable = target.closest("[data-track-click]");
      if (!clickable) return;
      const eventType = clickable.getAttribute("data-track-click");
      if (!eventType) return;
      this.send({
        name: "click",
        page: window.location.pathname,
        eventType,
        url: window.location.href,
        referrer: document.referrer
      });
      console.log("click", clickable);
    });
  }
  sendPageView() {
    this.send({
      name: "page_view",
      page: window.location.pathname,
      eventType: "page_view",
      url: window.location.href,
      referrer: document.referrer
    });
  }
  send(data) {
    if (!this.initialized) return;
    const { browser, device, os, version } = detectClient();
    const payload = {
      event: data,
      sessionId: this.sessionId,
      userAgent: browser.toString(),
      ipAddress: "127.0.0.1",
      metaData: { device, os, version }
    };
    const url = new URL("/api/v1/events", this.options.endpoint);
    url.searchParams.append("x-api-key", this.options.apiKey);
    navigator.sendBeacon(
      url,
      new Blob([JSON.stringify(payload)], {
        type: "application/json"
      })
    );
    localStorage.setItem("lastEvent", Date.now().toString());
  }
  generateSessionId() {
    var _a;
    return ((_a = crypto.randomUUID) == null ? void 0 : _a.call(crypto)) || Math.random().toString(36).substring(2);
  }
  generateOrUpdateSessionId() {
    const now = Date.now();
    const lastEvent = parseInt(localStorage.getItem("lastEvent") || "0", 10);
    const existingSessionId = localStorage.getItem("sessionId");
    const isValid = existingSessionId && now - lastEvent < 5 * 60 * 1e3;
    if (isValid) {
      localStorage.setItem("lastEvent", now.toString());
      return existingSessionId;
    }
    const newSessionId = this.generateSessionId();
    localStorage.setItem("sessionId", newSessionId);
    localStorage.setItem("lastEvent", now.toString());
    return newSessionId;
  }
};
var tracker = null;
var initTracker = (options) => {
  const t = new Tracker();
  tracker = t;
  tracker.init(options);
  if (window != void 0) window.analytics = tracker;
};

// src/react/useTrackPageView.ts
var import_react = require("react");
var useTrackPageView = ({ page, metaData, url }) => {
  (0, import_react.useEffect)(() => {
    return () => {
      var _a;
      (_a = tracker) == null ? void 0 : _a.send({
        eventType: "page_view",
        name: "page_view",
        page: page != null ? page : window.location.pathname,
        url: url != null ? url : window.location.href,
        referrer: document.referrer,
        metaData: metaData != null ? metaData : {}
      });
    };
  }, []);
};

// src/index.ts
var analytics = {
  initTracker
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  analytics,
  useTrackPageView
});
