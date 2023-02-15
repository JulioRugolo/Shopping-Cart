import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
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

  it('fetch é chamado com um parâmetro inexistente fetchProductsList', async () => {
    const param = 'haha'
    const actual =  `URL não mapeadahttps://api.mercadolibre.com/sites/MLB/search?q=${param}`
    const functionInput = fetchProductsList(param);
    await expect(() => functionInput).rejects.toThrow(actual);
  });

  // it('...', () => {
  // });
});
