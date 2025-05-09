import { initTracker, tracker } from "./tracker";
export * from "./react";

declare global {
  interface Window {
    analytics?: typeof tracker;
  }
}
// if (window != undefined) window.analytics = tracker;

export const analytics = {
  initTracker,
};
