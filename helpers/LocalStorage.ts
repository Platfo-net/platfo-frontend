/** Register an item via key and value in local storage
 * @param {string} key
 * @param {any} data
 * @param storage
 */
export function store(key, data, storage = window.localStorage) {
  if (!storage || !key) {
    return;
  }
  storage.setItem(key, JSON.stringify(data));
}

/** Get an item from local storage
 * @param {string} key
 * @param storage
 * @returns {string}
 */
export function read(key, storage = window.localStorage) {
  if (!storage || !key) {
    return;
  }

  const item = storage.getItem(key);
  if (!item) {
    return;
  }
  // const parse = JSON.parse();

  try {
    return JSON.parse(item);
  } catch (e) {
    return JSON.parse(`"${item}"`);
  }
}

/** Remove an item from local storage
 * @param {string} key
 * @param storage
 */
export function remove(key, storage = window.localStorage) {
  if (!storage || !key) {
    return;
  }
  storage.removeItem(key);
}
