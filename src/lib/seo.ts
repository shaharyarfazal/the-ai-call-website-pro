export const BASE_URL = "https://theaicall.pro";

export function getCanonicalUrl(pathname: string = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${BASE_URL}${path}`;
}
