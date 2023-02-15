import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.getElementsByClassName('products');

const createCartItem = (index) => {
  const createItem = document.createElement('li');
  createItem;
};

const addToCard = async () => {
  const addButton = document.getElementsByClassName('product__add');
  const produtID = document.getElementsByClassName('product');
  for (let index = 0; index < addButton.length; index += 1) {
    addButton[index].addEventListener('click', async () => {
      const findById = produtID[index].firstChild.innerText;
      const getItemById = await fetchProduct(findById);
      const createCartItem = createCartProductElement(getItemById);
      const olCart = document.getElementsByClassName('cart__products');
      olCart[0].appendChild(createCartItem);
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
  loadingMessage();
};
