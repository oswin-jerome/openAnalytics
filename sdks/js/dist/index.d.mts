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
