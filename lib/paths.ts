// lib/paths.ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/Landing';

/**
 * Prepend the base path to a given asset path.
 * Usage: <img src={withBase("/logo.png")} />
 */
export function withBase(path: string): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // If the path already starts with the BASE_PATH, don't duplicate it
  if (BASE_PATH && cleanPath.startsWith(BASE_PATH)) {
    return cleanPath;
  }
  
  return `${BASE_PATH}${cleanPath}`;
}
