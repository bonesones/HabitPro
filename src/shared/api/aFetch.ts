import { buildFullPath } from "../utils/buildFullPath";

export const aFetch = async (_url: string, _init: RequestInit = {}) => {
  const url = buildFullPath(process.env.NEXT_PUBLIC_ENDPOINT ?? "", _url);

  const response = await fetch(url, _init);

  return response;
};
