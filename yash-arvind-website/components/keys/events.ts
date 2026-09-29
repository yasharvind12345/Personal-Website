/** Lets any component (footer hint, hero hint) open the hidden-keys overlay. */
export const KEYS_TOGGLE_EVENT = 'hiddenkeys:toggle';

export function toggleHiddenKeys() {
  window.dispatchEvent(new CustomEvent(KEYS_TOGGLE_EVENT));
}
