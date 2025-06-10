<script>
  import { onMount } from "svelte";
  import {
    fetchFromBackend,
    updateBook,
    deleteBook,
    searchBooks,
  } from "$lib/api";

  // State for the list of books
  let books = [];
  let loading = true;
  let error = null;

  // State for the edit form
  let editingBook = null;
  let editTitle = "";
  let editAuthor = "";
  let editNote = "";
  let isEditing = false;
  let isSaving = false;
  let editError = null;

  // State for delete confirmation
  let confirmingDelete = null;
  let isDeleting = false;

  // State for search
  let searchQuery = "";
  let searchResults = [];
  let isSearching = false;
  let searchError = null;
  let isInSearchMode = false;

  // Function to fetch books from the API
  async function loadBooks() {
    try {
      loading = true;
      error = null;
      books = await fetchFromBackend("/api/books");
    } catch (err) {
      error = err.message;
      books = [];
    } finally {
      loading = false;
    }
  }

  // Function to open the edit form
  function openEditForm(book) {
    editingBook = book;
    editTitle = book.title || "";
    editAuthor = book.author || "";
    editNote = book.note || "";
    isEditing = true;
    editError = null;
  }

  // Function to close the edit form
  function closeEditForm() {
    isEditing = false;
    editingBook = null;
  }

  // Function to save edited book
  async function handleSaveEdit() {
    if (!editTitle.trim()) {
      editError = "Název knihy je povinný.";
      return;
    }

    try {
      isSaving = true;
      editError = null;

      await updateBook(editingBook.id, {
        title: editTitle,
        author: editAuthor ?? undefined,
        note: editNote ?? undefined,
      });

      // Update the book in the local state
      const index = books.findIndex((book) => book.id === editingBook.id);
      if (index !== -1) {
        books[index] = {
          ...books[index],
          title: editTitle,
          author: editAuthor || books[index].author,
          note: editNote,
        };
        books = [...books]; // Trigger reactivity

        // Also update search results if in search mode
        if (isInSearchMode) {
          const searchIndex = searchResults.findIndex(
            (book) => book.id === editingBook.id
          );
          if (searchIndex !== -1) {
            searchResults[searchIndex] = { ...books[index] };
            searchResults = [...searchResults];
          }
        }
      }

      closeEditForm();
    } catch (err) {
      editError = err.message;
    } finally {
      isSaving = false;
    }
  }

  // Function to start delete confirmation
  function confirmDelete(book) {
    confirmingDelete = book;
  }

  // Function to cancel delete
  function cancelDelete() {
    confirmingDelete = null;
  }

  // Function to delete a book
  async function handleDelete(id) {
    try {
      isDeleting = true;
      await deleteBook(id);
      books = books.filter((book) => book.id !== id);
      // Also update search results if in search mode
      if (isInSearchMode) {
        searchResults = searchResults.filter((book) => book.id !== id);
      }
      confirmingDelete = null;
    } catch (err) {
      error = err.message;
    } finally {
      isDeleting = false;
    }
  }

  // Function to handle search
  async function handleSearch() {
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }

    try {
      isSearching = true;
      searchError = null;
      searchResults = await searchBooks(searchQuery.trim());
      isInSearchMode = true;
    } catch (err) {
      searchError = err.message;
      searchResults = [];
    } finally {
      isSearching = false;
    }
  }

  // Function to clear search
  function clearSearch() {
    searchQuery = "";
    searchResults = [];
    isInSearchMode = false;
    searchError = null;
  }

  // Function to get the current book list (either all books or search results)
  function getCurrentBooks() {
    return isInSearchMode ? searchResults : books;
  }

  onMount(() => {
    loadBooks();
  });
</script>

<svelte:head>
  <title>Čtenářský deník | Seznam knih</title>
</svelte:head>

<div class="books-container">
  <h2>Seznam knih</h2>

  {#if loading}
    <div class="loading">
      <p>Načítání knih...</p>
    </div>
  {:else if error}
    <div class="error">
      <p>Došlo k chybě: {error}</p>
      <button on:click={loadBooks} class="retry-button">Zkusit znovu</button>
    </div>
  {:else if books.length === 0}
    <div class="empty">
      <p>Zatím zde nejsou žádné knihy.</p>
      <a href="/add" class="add-button">Přidat první knihu</a>
    </div>
  {:else}
    <!-- Search section -->
    <div class="search-section">
      <div class="search-container">
        <input
          type="text"
          bind:value={searchQuery}
          on:keydown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Hledat v knihách (název, autor, poznámka)..."
          class="search-input"
          disabled={isSearching}
        />
        <div class="search-buttons">
          <button
            on:click={handleSearch}
            class="search-button"
            disabled={isSearching || !searchQuery.trim()}
          >
            {#if isSearching}
              Hledání...
            {:else}
              Hledat
            {/if}
          </button>
          {#if isInSearchMode}
            <button
              on:click={clearSearch}
              class="clear-search-button"
              title="Zobrazit všechny knihy"
            >
              Zrušit
            </button>
          {/if}
        </div>
      </div>

      {#if searchError}
        <div class="search-error">
          <p>Chyba při vyhledávání: {searchError}</p>
        </div>
      {/if}

      {#if isInSearchMode}
        <p class="search-results">
          {#if searchResults.length === 0}
            Žádné knihy neodpovídají vašemu vyhledávání "{searchQuery}"
          {:else}
            Nalezeno {searchResults.length}
            {searchResults.length === 1
              ? "kniha"
              : searchResults.length < 5
                ? "knihy"
                : "knih"} pro "{searchQuery}"
          {/if}
        </p>
      {/if}
    </div>

    <a href="/add" class="add-button">Přidat novou knihu</a>

    {#if getCurrentBooks().length > 0}
      <div class="books-list">
        {#each getCurrentBooks() as book (book.id)}
          <div class="book-card">
            <h3>{book.title}</h3>
            {#if book.author}
              <p class="author">Autor: {book.author}</p>
            {/if}
            <div class="note">
              {#if book.note}
                <p class="note-content">{book.note}</p>
              {:else}
                <p class="note-empty">Žádná poznámka</p>
              {/if}
            </div>
            <div class="book-actions">
              <button on:click={() => openEditForm(book)} class="edit-button">
                Upravit
              </button>
              <button
                on:click={() => confirmDelete(book)}
                class="delete-button"
              >
                Smazat
              </button>
            </div>
          </div>
        {/each}
      </div>

      <!-- Add link to add page at the bottom as well -->
      {#if getCurrentBooks().length > 5}
        <div class="bottom-add-link">
          <a href="/add" class="add-button">Přidat novou knihu</a>
        </div>
      {/if}
    {:else if isInSearchMode}
      <div class="no-results">
        <p>Žádné knihy neodpovídají vašemu vyhledávání.</p>
        <button on:click={clearSearch} class="clear-search-link">
          Zobrazit všechny knihy
        </button>
      </div>
    {/if}
  {/if}
</div>

<!-- Edit Modal -->
{#if isEditing}
  <div
    class="modal-backdrop"
    on:click={closeEditForm}
    on:keydown={(e) => e.key === "Escape" && closeEditForm()}
    role="button"
    tabindex="0"
    aria-label="Zavřít úpravu knihy"
  ></div>
  <div class="modal">
    <h3>Upravit knihu</h3>

    {#if editError}
      <div class="error-message">
        {editError}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSaveEdit}>
      <div class="form-group">
        <label for="edit-title">Název knihy *</label>
        <input
          type="text"
          id="edit-title"
          bind:value={editTitle}
          placeholder="Zadejte název knihy"
          required
          disabled={isSaving}
        />
      </div>

      <div class="form-group">
        <label for="edit-author">Autor</label>
        <input
          type="text"
          id="edit-author"
          bind:value={editAuthor}
          placeholder="Zadejte jméno autora (nepovinné)"
          disabled={isSaving}
        />
      </div>

      <div class="form-group">
        <label for="edit-note">Poznámka</label>
        <textarea
          id="edit-note"
          bind:value={editNote}
          placeholder="Zadejte poznámku nebo komentář ke knize (nepovinné)"
          rows="5"
          disabled={isSaving}
        ></textarea>
      </div>

      <div class="modal-actions">
        <button type="submit" class="save-button" disabled={isSaving}>
          {#if isSaving}
            Ukládám...
          {:else}
            Uložit
          {/if}
        </button>
        <button
          type="button"
          class="cancel-button"
          on:click={closeEditForm}
          disabled={isSaving}
        >
          Zrušit
        </button>
      </div>
    </form>
  </div>
{/if}

<!-- Delete Confirmation -->
{#if confirmingDelete}
  <div
    class="modal-backdrop"
    on:click={cancelDelete}
    on:keydown={(e) => e.key === "Escape" && cancelDelete()}
    role="button"
    tabindex="0"
    aria-label="Zrušit mazání knihy"
  ></div>
  <div class="modal delete-confirm-modal">
    <h3>Smazat knihu</h3>
    <p>
      Opravdu chcete smazat knihu <strong>"{confirmingDelete.title}"</strong>?
      Tato akce nelze vrátit.
    </p>

    <div class="modal-actions">
      <button
        on:click={() => handleDelete(confirmingDelete.id)}
        class="delete-confirm-button"
        disabled={isDeleting}
      >
        {#if isDeleting}
          Mazání...
        {:else}
          Smazat
        {/if}
      </button>
      <button
        class="cancel-button"
        on:click={cancelDelete}
        disabled={isDeleting}
      >
        Zrušit
      </button>
    </div>
  </div>
{/if}

<style>
  .books-container {
    padding: 1rem 0;
  }

  h2 {
    color: #333;
    margin-bottom: 1.5rem;
  }

  .loading,
  .error,
  .empty {
    text-align: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .error {
    background-color: #ffebee;
  }

  .retry-button,
  .add-button {
    display: inline-block;
    background-color: #4a69bd;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    margin-bottom: 1.5rem;
  }

  .add-button {
    margin-right: 1rem;
  }

  .bottom-add-link {
    text-align: center;
    margin: 2rem 0 1rem;
  }

  /* Search styles */
  .search-section {
    margin-bottom: 1.5rem;
  }

  .search-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .search-input:focus {
    outline: none;
    border-color: #4a69bd;
    box-shadow: 0 0 0 2px rgba(74, 105, 189, 0.2);
  }

  .search-input:disabled {
    background-color: #f5f5f5;
    opacity: 0.7;
  }

  .search-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .search-button {
    background-color: #4a69bd;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .search-button:hover:not(:disabled) {
    background-color: #3a559d;
  }

  .search-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .clear-search-button {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .clear-search-button:hover {
    background-color: #e5e5e5;
  }

  .search-error {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .search-results {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
    font-style: italic;
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin: 1rem 0;
  }

  .clear-search-link {
    background: none;
    border: none;
    color: #4a69bd;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
  }

  .clear-search-link:hover {
    color: #3a559d;
  }

  .books-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .book-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }

  .book-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .book-card h3 {
    margin-top: 0;
    color: #333;
  }

  .author {
    color: #666;
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .note {
    margin: 0.75rem 0;
    flex-grow: 1;
    border-top: 1px solid #eee;
    padding-top: 0.75rem;
  }

  .note-content {
    color: #333;
    white-space: pre-line;
  }

  .note-empty {
    color: #999;
    font-style: italic;
  }

  .book-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .edit-button,
  .delete-button {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    border: none;
    flex: 1;
  }

  .edit-button {
    background-color: #4a69bd;
    color: white;
  }

  .delete-button {
    background-color: #f5f5f5;
    color: #d32f2f;
    border: 1px solid #ffcdd2;
  }

  .edit-button:hover {
    background-color: #3a559d;
  }

  .delete-button:hover {
    background-color: #ffebee;
  }

  /* Modal styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .modal h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }

  .modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .save-button,
  .delete-confirm-button {
    background-color: #4a69bd;
    color: white;
    border: none;
    padding: 0.65rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-button {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    padding: 0.65rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-confirm-button {
    background-color: #d32f2f;
  }

  .save-button:hover:not(:disabled),
  .delete-confirm-button:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  .cancel-button:hover:not(:disabled) {
    background-color: #e5e5e5;
  }

  .save-button:disabled,
  .delete-confirm-button:disabled,
  .cancel-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-message {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .delete-confirm-modal {
    max-width: 400px;
  }
</style>
