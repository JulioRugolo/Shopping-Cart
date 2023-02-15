export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (input) => {
  if (!input) {
    throw new Error('Termo de busca não informado');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${input}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};
