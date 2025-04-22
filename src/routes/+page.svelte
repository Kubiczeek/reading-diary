<script>
    import { onMount } from 'svelte';
    import { fetchFromBackend } from '$lib/api';
    
    // State for the list of books
    let books = [];
    let loading = true;
    let error = null;
    
    // Function to fetch books from the API
    async function loadBooks() {
        try {
            loading = true;
            error = null;
            books = await fetchFromBackend('/api/books');
        } catch (err) {
            error = err.message;
            books = [];
        } finally {
            loading = false;
        }
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
        <div class="books-list">
            {#each books as book (book.id)}
                <div class="book-card">
                    <h3>{book.title}</h3>
                    {#if book.author}
                        <p class="author">Autor: {book.author}</p>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .books-container {
        padding: 1rem 0;
    }
    
    h2 {
        color: #333;
        margin-bottom: 1.5rem;
    }
    
    .loading, .error, .empty {
        text-align: center;
        padding: 2rem;
        background-color: #f9f9f9;
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .error {
        background-color: #ffebee;
    }
    
    .retry-button, .add-button {
        display: inline-block;
        background-color: #4a69bd;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        text-decoration: none;
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
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .book-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .book-card h3 {
        margin-top: 0;
        color: #333;
    }
    
    .author {
        color: #666;
        font-style: italic;
    }
</style>
