import { p as push, d as slot, c as pop } from './index-BFAbDqq9.js';
import { a as attr } from './attributes-YVTFWYF4.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function _layout($$payload, $$props) {
  push();
  let backendUrl = "";
  $$payload.out += `<header class="svelte-fska66"><nav><div class="nav-container svelte-fska66"><div class="logo svelte-fska66"><h1 class="svelte-fska66">Čtenářský deník</h1></div> <div class="links svelte-fska66"><a href="/" class="svelte-fska66">Seznam knih</a> <a href="/add" class="svelte-fska66">Přidat knihu</a></div></div> <div class="backend-url svelte-fska66"><label>URL backendu: <input type="text" placeholder="např. http://localhost:8000"${attr("value", backendUrl)} class="svelte-fska66"></label></div></nav></header> <main class="svelte-fska66"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main> <footer class="svelte-fska66"><p>Čtenářský deník © ${escape_html((/* @__PURE__ */ new Date()).getFullYear())}</p></footer>`;
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-Dy5pFbqI.js.map
