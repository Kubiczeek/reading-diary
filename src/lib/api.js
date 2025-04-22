import { browser } from "$app/environment";

// Get the backend URL from cookies
export function getBackendUrl() {
  if (!browser) return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; backendUrl=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

// Fetch data from backend with proper error handling
export async function fetchFromBackend(endpoint, options = {}) {
  const baseUrl = getBackendUrl();

  if (!baseUrl) {
    throw new Error(
      "Backend URL is not set. Please set it in the header input."
    );
  }

  try {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
