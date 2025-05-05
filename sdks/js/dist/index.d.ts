interface TrackerOptions {
    apiKey: string;
    endpoint: string;
    meta?: Record<string, any>;
}

declare class Tracker {
    private options;
    private sessionId;
    private initialized;
    init(options: TrackerOptions): void;
    sendPageView(): void;
    private send;
    generateSessionId(): string;
}
declare const tracker: Tracker;

declare global {
    interface Window {
        analytics?: typeof tracker;
    }
}

export { tracker as default };
