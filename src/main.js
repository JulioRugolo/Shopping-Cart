import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.getElementsByClassName('products');

const resultProduct = await fetchProductsList('computador');
resultProduct.forEach((element) => {
  sectionProducts[0].appendChild(createProductElement(element));
});
