import { p as push, h as head, c as pop } from './index-BFAbDqq9.js';
import './client-BNK_pNP3.js';
import { a as attr } from './attributes-YVTFWYF4.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './exports-CoBaX9l6.js';

function _page($$payload, $$props) {
  push();
  let title = "";
  let author = "";
  let note = "";
  let submitting = false;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Čtenářský deník | Přidat knihu</title>`;
  });
  $$payload.out += `<div class="add-book-container svelte-1o3qd8i"><h2 class="svelte-1o3qd8i">Přidat novou knihu</h2> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form><div class="form-group svelte-1o3qd8i"><label for="title" class="svelte-1o3qd8i">Název knihy *</label> <input type="text" id="title"${attr("value", title)} placeholder="Zadejte název knihy" required${attr("disabled", submitting, true)} class="svelte-1o3qd8i"></div> <div class="form-group svelte-1o3qd8i"><label for="author" class="svelte-1o3qd8i">Autor</label> <input type="text" id="author"${attr("value", author)} placeholder="Zadejte jméno autora (nepovinné)"${attr("disabled", submitting, true)} class="svelte-1o3qd8i"></div> <div class="form-group svelte-1o3qd8i"><label for="note" class="svelte-1o3qd8i">Poznámka</label> <textarea id="note" placeholder="Zadejte poznámku nebo komentář ke knize (nepovinné)" rows="5"${attr("disabled", submitting, true)} class="svelte-1o3qd8i">`;
  const $$body = escape_html(note);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea></div> <div class="form-actions svelte-1o3qd8i"><button type="submit" class="submit-button svelte-1o3qd8i"${attr("disabled", submitting, true)}>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `Přidat knihu`;
  }
  $$payload.out += `<!--]--></button> <a href="/" class="cancel-button svelte-1o3qd8i">Zrušit</a></div></form></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Lyr84P6o.js.map
