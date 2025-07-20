export interface BaseResponse<T> {
  code: number;
  data: T;
}
