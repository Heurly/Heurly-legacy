export function getBaseUrl(fullUrl: string) {
  const protocolIndex = fullUrl.indexOf("://");
  if (protocolIndex !== -1) {
    const baseUrlStart = protocolIndex + 3; // Start index of the base URL
    const pathIndex = fullUrl.indexOf("/", baseUrlStart); // Find the first occurrence of "/"
    if (pathIndex !== -1) {
      return fullUrl.substring(0, pathIndex); // Extract base URL
    }
    return fullUrl; // If no "/" found after protocol, return the full URL
  }
  return null; // Invalid URL format
}
