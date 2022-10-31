export function store(key: string, data: any, storage = window.localStorage) {
  storage.setItem(key, JSON.stringify(data));
}

export function read(key: string, storage = window.localStorage) {
  const item = storage.getItem(key);
  if (!item) {
    return;
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    return JSON.parse(`"${item}"`);
  }
}

export function remove(key: string, storage = window.localStorage) {
  storage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}
