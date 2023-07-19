import './mocks/fetchSimulator';
import { fetchProductsList, fetchProduct } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled()
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    
    const expected = await fetchProductsList('computador');
    expect(expected.length).toEqual(50);
  });

  it('fetch é chamado sem nenhum parâmetro fetchProductsList', async () => {
    await expect(() => fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });

  // it('...', () => {
  // });
});

describe('Teste a função fetchProduct', () => {
  it('fetchProduct é chamada sem nenhum parâmetro', async () => {
    expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
  it('fetchProduct é chamada com ID', async () => {
    expect(typeof await fetchProduct('MLB1405519561')).toBe('object');
  });
});


