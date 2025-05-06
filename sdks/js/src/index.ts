import { initTracker, tracker } from "./tracker";

declare global {
  interface Window {
    analytics?: typeof tracker;
  }
}
// if (window != undefined) window.analytics = tracker;

export const analytics = {
  initTracker,
};
