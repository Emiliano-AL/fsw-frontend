export type APIResponse<T> = {
  Success: boolean
  Content: T;
  StatusCode?: number;
  Message?: string;
}