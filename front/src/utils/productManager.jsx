const productsFile = 'products.json';

export const saveProducts = (products) => {
  fetch('/api/save-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  });
};

export const getProducts = () => {
  return fetch('/api/get-products')
    .then(response => response.json());
};
