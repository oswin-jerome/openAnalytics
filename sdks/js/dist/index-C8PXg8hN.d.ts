interface TrackerOptions {
    apiKey: string;
    endpoint: string;
    meta?: Record<string, any>;
}
interface EventPayload {
    name: string;
    page?: string;
    referrer?: string;
    url: string;
    eventType: string;
    sessionId?: string;
    metaData?: any;
}

declare const useTrackPageView: ({ page, metaData, url }: Partial<Pick<EventPayload, "page" | "metaData" | "url">>) => void;

export { type EventPayload as E, type TrackerOptions as T, useTrackPageView as u };
