export interface ApiResponse<T> {
  sort(arg0: (a: any, b: any) => number): unknown;
  message: string;
  errors: Error[];
  success: boolean;
  data: T;
}

export interface Error {
  field: string;
  errorMessage: string;
}
