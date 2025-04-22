<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // Define reactive variable for backend URL
  let backendUrl = "";

  // Cookie handling functions
  function setCookie(name, value, days) {
    if (!browser) return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  function getCookie(name) {
    if (!browser) return "";

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  }

  onMount(() => {
    // Load the backend URL from cookie when the component mounts
    backendUrl = getCookie("backendUrl") || "";
  });

  // Save the backend URL to a cookie whenever it changes
  function saveBackendUrl() {
    setCookie("backendUrl", backendUrl, 30); // Save for 30 days
  }
</script>

<header>
  <nav>
    <div class="nav-container">
      <div class="logo">
        <h1>Čtenářský deník</h1>
      </div>
      <div class="links">
        <a href="/">Seznam knih</a>
        <a href="/add">Přidat knihu</a>
      </div>
    </div>
    <div class="backend-url">
      <label>
        URL backendu:
        <input
          type="text"
          placeholder="např. http://localhost:8000"
          bind:value={backendUrl}
          on:blur={saveBackendUrl}
        />
      </label>
    </div>
  </nav>
</header>

<main>
  <slot />
</main>

<footer>
  <p>Čtenářský deník &copy; {new Date().getFullYear()}</p>
</footer>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  header {
    background-color: #4a69bd;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .logo h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .links a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .links a:hover {
    color: #e3e3e3;
  }

  .backend-url {
    max-width: 1200px;
    margin: 0.5rem auto 0;
    padding: 0 1rem;
    color: white;
  }

  .backend-url input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    min-height: calc(100vh - 200px);
  }

  footer {
    text-align: center;
    padding: 1rem 0;
    background-color: #f5f5f5;
    color: #666;
  }
</style>
