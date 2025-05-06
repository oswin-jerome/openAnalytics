export interface ApiResponse<T> {
  sort(arg0: (a: any, b: any) => number): unknown;
  message: string;
  errors: Error[];
  success: boolean;
  data: T;
}

type PageParams = Promise<{ proj_id: string }>;

export interface Error {
  field: string;
  errorMessage: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  user: User;
}
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  authorities: Authority[];
  username: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface Authority {
  authority: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  metrics?: Metrics;
}

export interface Metrics {
  totalEvents: number;
  totalSessions: number;
  totalVisitors: number;
  topPages: string[];
  topReferrers: string[];
  eventCounts: EventCount[];
}

export interface EventCount {
  key: string;
  value: number;
}

export interface Event {
  id: string;
  name: string;
  page: string;
  referrer: string;
  url: string;
  eventType: string;
  metaData: Map<string, string>;
  createdAt: Date;
}

export interface Session {
  id: string;
  sessionId: string;
  userAgent: string;
  ipAddress: string;
  metaData: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
}
