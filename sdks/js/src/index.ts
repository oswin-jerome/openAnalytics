export * from "./js";
export * from "./react";

import { Tracker } from "./core";
// import { initTracker, tracker } from "./tracker";
// // export * from "./react";
// export * from "./js";

declare global {
  interface Window {
    analytics?: Tracker;
  }
}
// // if (window != undefined) window.analytics = tracker;

// export const analytics = {
//   initTracker,
// };
