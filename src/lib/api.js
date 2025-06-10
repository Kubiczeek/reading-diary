import { browser } from "$app/environment";

// Get the backend URL from cookies
export function getBackendUrl() {
  if (!browser) return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; backendUrl=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

// Fetch data from backend with proper error handling for both JSON and non-JSON responses
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

    // Pro DELETE požadavky, které často vracejí prázdné odpovědi
    if (options.method === "DELETE") {
      return { success: true, statusCode: response.status };
    }

    const contentType = response.headers.get("content-type");
    // Zkontrolujeme, jestli má odpověď obsah
    const contentLength = response.headers.get("content-length");
    const isEmpty =
      contentLength === "0" || (!contentLength && response.status === 204);

    // Prázdné odpovědi zpracováváme zvlášť
    if (isEmpty) {
      return { success: true, statusCode: response.status };
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Handle non-JSON response
      const text = await response.text();
      if (!text) {
        return { success: true, statusCode: response.status };
      }

      try {
        // Attempt to parse as JSON anyway in case Content-Type header is missing/wrong
        return JSON.parse(text);
      } catch (e) {
        // Return plain text if it's not valid JSON
        return { message: text || "Success", statusCode: response.status };
      }
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Helper functions for specific API operations
export async function updateBook(id, bookData) {
  return fetchFromBackend(`/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });
}

export async function deleteBook(id) {
  // Použijeme speciální nastavení pro DELETE požadavky
  return fetchFromBackend(`/api/books/${id}`, {
    method: "DELETE",
  });
}

export async function searchBooks(query) {
  const encodedQuery = encodeURIComponent(query);
  return fetchFromBackend(`/api/books/search?q=${encodedQuery}`);
}
