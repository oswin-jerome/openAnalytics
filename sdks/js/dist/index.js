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
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

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
