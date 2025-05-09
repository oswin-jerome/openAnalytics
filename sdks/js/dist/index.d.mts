import { T as TrackerOptions, E as EventPayload } from './index-C8PXg8hN.mjs';
export { u as useTrackPageView } from './index-C8PXg8hN.mjs';

declare class Tracker {
    private options;
    private sessionId;
    private initialized;
    init(options: TrackerOptions): void;
    sendPageView(): void;
    send(data: EventPayload): void;
    generateSessionId(): string;
    generateOrUpdateSessionId(): string;
}
declare let tracker: Tracker | null;

declare global {
    interface Window {
        analytics?: typeof tracker;
    }
}
declare const analytics: {
    initTracker: (options: TrackerOptions) => void;
};

export { analytics };
