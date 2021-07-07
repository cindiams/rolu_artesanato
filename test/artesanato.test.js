import request from 'supertest';

import app2 from '../src/app2';

let artesanato;

beforeEach(() => {
  artesanato = [{
    code: 12,
    description: 'Linha Amigurumi Verde',
    buyPrice: 10,
    sellPrice: 16,
    tags: ['amigurumi', 'Circulo', 'artesanato'],
  }, {
    code: 99,
    description: 'Linha Amigulove Vermelho',
    buyPrice: 12,
    sellPrice: 19,
    tags: ['amigurumi', 'Cisne', 'artesanato'],
  }];
});

test('Deve ser possível adicionar um novo produto', async () => {
  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);


  expect(response.body).toMatchObject({
    ...artesanato[0],
    lovers: 0,
  });
});

test('O status code de um produto criado deverá ser 201', async () => {
  await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  expect(201);
});

test('Deve ser possível atualizar dados de um produto', async () => {
  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  const updateProduct = {
    ...artesanato[0],
    description: 'Linha amigurumi Azul',
  };

  const responseUpdate = await request(app2)
    .put(`/artesanato/${response.body.id}`)
    .send(updateProduct);

  expect(responseUpdate.body).toMatchObject(updateProduct);
});

test('Não deve ser possível atualizar um produto inexistente', async () => {
  await request(app2)
    .put('/artesanato/9198123')
    .expect(400);
});

test('Não deve ser possível remover um produto inexistente', async () => {
  await request(app2)
    .delete('/artesanato/9198123')
    .expect(400);
});

test('Deve retornar o código 204 quando um produto for removido', async () => {
  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  await request(app2)
    .delete(`/artesanato/${response.body.code}`)
    .expect(204);
});

test('Deve ser possível listar todos os produtos', async () => {
  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  const responseGet = await request(app2)
    .get('/artesanato');

  expect(responseGet.body).toHaveLength(1);
});

test('Deve ser possível remover os produtos pelo código', async () => {
  await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  await request(app2)
    .post('/artesanato')
    .send(artesanato[1]);

  await request(app2)
    .delete(`/artesanato/${response.body.code}`);

  const responseAll = await request(app2)
    .get('/artesanato');

  expect(responseAll.body).toHaveLength(1);
});

test('Deve ser possível dar love em um produto', async () => {
  const response = await request(app2)
    .post('/artesanato')
    .send(artesanato[0]);

  const responseLove = await request(app2)
    .post(`/artesanato/${response.body.code}/love`)
    .send(response.body);

  expect(responseLove.body).toMatchObject({
    lovers: 1,
  });

});

test('Deve retornar o código 204 quando um produto for pesquisado', async () => {
    const response = await request(app2)
      .post('/artesanato')
      .send(artesanato[0]);
  
    await request(app2)
      .get(`/artesanato/${response.body.code}`)
      .expect(204);
});