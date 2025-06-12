export type SuccessMessageResponse = {
  message: string;
};

export type ApiResponse<T = undefined> = T extends undefined
  ? { message: string }
  : { message: string; data: T };

export interface PaginatedResult<T> {
  data: T[];
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
