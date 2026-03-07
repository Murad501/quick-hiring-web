export interface IResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  message: string;
  success: boolean;
  statusCode: number;
}
