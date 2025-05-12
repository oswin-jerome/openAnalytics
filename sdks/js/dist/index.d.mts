export { help, initTracker, pushManualEvent } from './js/index.mjs';
import { T as TrackerOptions, E as EventPayload } from './types-BMDmW5ZE.mjs';

declare class Tracker {
    private options;
    private sessionId;
    private initialized;
    init(options: TrackerOptions): void;
    send(data: EventPayload): void;
}

declare global {
    interface Window {
        analytics?: Tracker;
    }
}
