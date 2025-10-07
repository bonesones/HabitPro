import { ApiResponse } from "../types";

import { buildFullPath } from "../utils/buildFullPath";

export const aFetch = async <T>(
  _url: string,
  _init: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = buildFullPath(process.env.NEXT_PUBLIC_ENDPOINT ?? "", _url);

  const response = await fetch(url, _init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse<T>;

  return data;
};
