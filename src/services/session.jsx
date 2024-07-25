import store from 'store2';

export const session = {
  add: (key, data) => {
    const storedData = store.get(key) || [];
    storedData.push(data);
    store.set(key, storedData);
  },
  removeAll: () => {
    store.clearAll();
  },
  remove: (user) => {
    store.remove(user);
  },
  get: (key) => store.get(key)
};
