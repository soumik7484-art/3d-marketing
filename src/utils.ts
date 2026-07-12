/**
 * Resolves local assets from the public folder to their correct base path
 * on both local development and GitHub Pages subpath deployment.
 */
export function getAssetUrl(path: string): string {
  if (!path) return "";
  // Strip leading slash if present to avoid double slashes with BASE_URL
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
