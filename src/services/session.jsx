import store from 'store2';

export const session = {
  add: (key, data) => {
    const storedData = store.get(key) || [];
    storedData.push(data);
    store.set(key, storedData);
  },
  
  remove: (key, id) => {
    const storedData = store.get(key) || [];
    const updatedData = storedData.filter((item) => item.id !== id);
    store.set(key, updatedData);
  }, 
   get: (key) => store.get(key)
};
