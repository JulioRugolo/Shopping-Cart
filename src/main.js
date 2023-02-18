import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.getElementsByClassName('products');

const addToCard = async () => {
  const addButton = document.getElementsByClassName('product__add');
  const produtID = document.getElementsByClassName('product');
  for (let index = 0; index < addButton.length; index += 1) {
    addButton[index].addEventListener('click', async () => {
      const findById = produtID[index].firstChild.innerText;
      const getPrice = document.getElementsByClassName('total-price')[0];
      const getItemById = await fetchProduct(findById);
      let updateValue = localStorage.getItem('cartValue');
      updateValue = getItemById.price + Number(updateValue);
      localStorage.setItem('cartValue', updateValue);
      const createItem = createCartProductElement(getItemById);
      const olCart = document.getElementsByClassName('cart__products');
      olCart[0].appendChild(createItem);
      getPrice.innerText = localStorage.getItem('cartValue');
      saveCartID(findById);
    });
  }
};

const errorMessage = (error) => {
  const createErrorSection = document.createElement('section');
  createErrorSection.className = 'error';
  createErrorSection.innerText = error;
  sectionProducts[0].appendChild(createErrorSection);
};

const loadingProducts = async () => {
  const resultProduct = await fetchProductsList('computador');
  resultProduct.forEach((element) => {
    sectionProducts[0].appendChild(createProductElement(element));
  });
};

const retrieveCart = async () => {
  const itensLocalStorage = getSavedCartIDs();
  const retrieveValue = localStorage.getItem('cartValue');
  const cartValue = document.getElementsByClassName('total-price')[0];
  cartValue.innerText = retrieveValue;
  if (itensLocalStorage.length === 1) {
    const getItemById = await fetchProduct(itensLocalStorage);
    const createItem = createCartProductElement(getItemById);
    const olCart = document.getElementsByClassName('cart__products');
    olCart[0].appendChild(createItem);
  } else {
    itensLocalStorage.forEach(async (item) => {
      const getItemById = await fetchProduct(item);
      const createItem = createCartProductElement(getItemById);
      const olCart = document.getElementsByClassName('cart__products');
      olCart[0].appendChild(createItem);
    });
  }
};

const loadingMessage = async () => {
  const loading = document.createElement('section');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  sectionProducts[0].appendChild(loading);
  await loadingProducts().catch((error) => errorMessage(error.message));
  sectionProducts[0].removeChild(loading);
  addToCard();
};

window.onload = () => {
  retrieveCart();
  loadingMessage();
};
