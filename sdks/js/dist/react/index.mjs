import {
  useTrackPageView
} from "../chunk-PAO6TCS5.mjs";
export {
  useTrackPageView
};
opertyDescriptor;
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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  useTrackPageView: () => useTrackPageView
});
module.exports = __toCommonJS(react_exports);

// src/react/useTrackPageView.ts
var import_react = require("react");

// src/tracker.ts
var tracker = null;

// src/react/useTrackPageView.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTrackPageView
});
