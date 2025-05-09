export interface TrackerOptions {
  apiKey: string;
  endpoint: string;
  autoTrackPageViews?: boolean;
  meta?: Record<string, any>;
}

export interface APIPayload {
  event: EventPayload;
  sessionId: string;
  userAgent: string;
  ipAddress: string;
  projectId?: string;
  metaData?: any;
}

export interface EventPayload {
  name: string;
  page?: string;
  referrer?: string;
  url: string;
  eventType: string;
  sessionId?: string;
  metaData?: any;
}
