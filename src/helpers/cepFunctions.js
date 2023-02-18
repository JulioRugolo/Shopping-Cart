export const getAddress = async (cep) => {
  const urlPromise1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const urlPromise2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  const promise1 = await fetch(urlPromise1);
  const promise2 = await fetch(urlPromise2);
  const promises = [promise1, promise2];
  return Promise.any(promises).then((value) => value.json()).then((data) => {
    const rua = data.address;
    const bairro = data.district;
    const cidade = data.city;
    const estado = data.state;
    const fullAdress = `${rua} - ${bairro} - ${cidade} - ${estado}`;
    const adressResult = document.getElementsByClassName('cart__address')[0];
    adressResult.innerText = fullAdress;
  });
};

export const searchCep = async () => {
  // seu código aqui
  const cep = document.getElementsByClassName('cep-input')[0].value;
  const adressResult = document.getElementsByClassName('cart__address')[0];
  try {
    await getAddress(cep);
  } catch (error) {
    adressResult.innerHTML = 'CEP não encontrado';
  }
};
