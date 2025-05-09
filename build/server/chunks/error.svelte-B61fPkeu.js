import { e as escape_html } from './escaping-CqgfEcN3.js';
import { p as push, c as pop, g as getContext } from './index-BFAbDqq9.js';
import { s as stores } from './client-BNK_pNP3.js';
import './exports-CoBaX9l6.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-B61fPkeu.js.map
