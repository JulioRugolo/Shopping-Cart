import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.getElementsByClassName('products');

const errorMessage = (error) => {
  const createErrorSection = document.createElement('section');
  createErrorSection.className = 'error';
  createErrorSection.innerText = error;
  sectionProducts[0].appendChild(createErrorSection);
};

const loadingProducts = async () => {
  const resultProduct = await fetchProductsList('computdasdadasador');
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
};

window.onload = () => {
  loadingMessage();
};
