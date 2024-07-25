import store from 'store2';

export const session = {
  add: (key, data) => {
    const storedData = store.get(key) || [];
    storedData.push(data);
    store.set(key, storedData);
  },
  
  remove: (product) => {
    store.remove(product);
  },
  get: (key) => store.get(key)
};
