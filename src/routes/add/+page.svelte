<script>
  import { fetchFromBackend } from "$lib/api";
  import { goto } from "$app/navigation";

  // Book data
  let title = "";
  let author = "";
  let submitting = false;
  let error = null;
  let success = false;

  // Function to submit the form
  async function handleSubmit() {
    if (!title.trim()) {
      error = "Název knihy je povinný.";
      return;
    }

    try {
      submitting = true;
      error = null;
      success = false;

      await fetchFromBackend("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author: author || undefined, // Only send author if it's not empty
        }),
      });

      // Reset form and show success message
      success = true;
      title = "";
      author = "";

      // Navigate back to the home page after a short delay
      setTimeout(() => {
        goto("/");
      }, 1500);
    } catch (err) {
      error = err.message;
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>Čtenářský deník | Přidat knihu</title>
</svelte:head>

<div class="add-book-container">
  <h2>Přidat novou knihu</h2>

  {#if success}
    <div class="success-message">
      Kniha byla úspěšně přidána! Budete přesměrováni zpět na seznam knih.
    </div>
  {/if}

  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="title">Název knihy *</label>
      <input
        type="text"
        id="title"
        bind:value={title}
        placeholder="Zadejte název knihy"
        required
        disabled={submitting}
      />
    </div>

    <div class="form-group">
      <label for="author">Autor</label>
      <input
        type="text"
        id="author"
        bind:value={author}
        placeholder="Zadejte jméno autora (nepovinné)"
        disabled={submitting}
      />
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button" disabled={submitting}>
        {#if submitting}
          Přidávám...
        {:else}
          Přidat knihu
        {/if}
      </button>

      <a href="/" class="cancel-button">Zrušit</a>
    </div>
  </form>
</div>

<style>
  .add-book-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #4a69bd;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .submit-button {
    background-color: #4a69bd;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #3a559d;
  }

  .submit-button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }

  .cancel-button {
    display: inline-block;
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    transition: background-color 0.2s;
  }

  .cancel-button:hover {
    background-color: #e5e5e5;
  }

  .error-message {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  .success-message {
    background-color: #e8f5e9;
    color: #2e7d32;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
</style>
