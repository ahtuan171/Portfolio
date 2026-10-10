/** Client-side preference cookie (1 year). Read back on the server by getI18n(). */
export function setPreferenceCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}
