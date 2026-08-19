/**
 * Helper to resolve static asset paths correctly across different deployment environments,
 * including GitHub Pages with repository subpaths (e.g. /PetaDigital.DesaKerep/).
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  const baseUrl = import.meta.env.BASE_URL || './';
  // Remove leading slash if any
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${cleanPath}`;
  }
  return `${baseUrl}/${cleanPath}`;
}
