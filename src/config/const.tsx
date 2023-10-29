import { getBaseUrl } from "@/utils/getBaseUrl";
let xUrl = "/api";

async function setApiUrl() {
  if (typeof window === "undefined") {
    // Server-side logic
    const { headers } = await import("next/headers");
    const xUrlHeader = headers().get("x-url");
    if (xUrlHeader) {
      xUrl = getBaseUrl(xUrlHeader) + "/api";
    }
  }
}

// Call the async function to set the API URL
setApiUrl();

export { xUrl as API_URL };
