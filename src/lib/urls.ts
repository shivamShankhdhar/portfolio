/**
 * Resolves the Mobile Apps portal URL.
 * Automatically derives from current domain by prefixing with 'apps.'
 * (e.g. www.shivamshankhdhar.online -> https://www.apps.shivamshankhdhar.online)
 * and safely replaces legacy localhost references.
 */
export function resolveAppsUrl(storedUrl?: string): string {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      if (hostname.startsWith('www.')) {
        const base = hostname.slice(4);
        return `${protocol}//www.apps.${base}`;
      }
      return `${protocol}//www.apps.${hostname}`;
    }
  }

  if (storedUrl && !storedUrl.includes('localhost:3000') && !storedUrl.includes('localhost:3002')) {
    return storedUrl;
  }

  if (process.env.NEXT_PUBLIC_APPS_URL) {
    return process.env.NEXT_PUBLIC_APPS_URL;
  }

  return 'https://www.apps.shivamshankhdhar.online';
}
