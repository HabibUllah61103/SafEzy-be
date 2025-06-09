export type SuccessMessageResponse = {
  message: string;
};

export type ApiResponse<T = undefined> = T extends undefined
  ? { message: string }
  : { message: string; data: T };
