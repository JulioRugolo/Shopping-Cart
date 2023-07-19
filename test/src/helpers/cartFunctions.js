import { fetchProduct } from './fetchFunctions';

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = async (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  const getProductPrice = await fetchProduct(id);
  let updateValue = localStorage.getItem('cartValue');
  updateValue = Number(updateValue) - getProductPrice.price;
  localStorage.setItem('cartValue', updateValue);
  const getSubTotal = document.getElementsByClassName('total-price')[0];
  getSubTotal.innerText = localStorage.getItem('cartValue');
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};
