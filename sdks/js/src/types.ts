export interface TrackerOptions {
  apiKey: string;
  endpoint: string;
  meta?: Record<string, any>;
}

export interface APIPayload {
  event: EventPayload;
  sessionId: string;
  userAgent: string;
  ipAddress: string;
  projectId?: string;
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
