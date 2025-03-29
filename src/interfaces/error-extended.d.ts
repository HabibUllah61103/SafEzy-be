export interface ErrorExtended extends Error {
  response: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
}
