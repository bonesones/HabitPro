import { ApiResponse } from '../types';

export const aFetch = async <T>(
  url: string,
  init: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse<T>;

  return data;
};
