import { p as push, h as head, c as pop } from './index-BFAbDqq9.js';

function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Čtenářský deník | Seznam knih</title>`;
  });
  $$payload.out += `<div class="books-container svelte-12plgk0"><h2 class="svelte-12plgk0">Seznam knih</h2> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading svelte-12plgk0"><p>Načítání knih...</p></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B-XCXaq0.js.map
