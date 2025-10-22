export const buildFullPath = (baseURL: string, requestedURL: string) => {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/* ---------------------------------- Utils --------------------------------- */

const isAbsoluteURL = (url: string) =>
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
const combineURLs = (baseURL: string, relativeURL: string) =>
  relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
