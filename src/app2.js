/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app2 = express();

app2.use(express.json());
app2.use(cors());

let artesanato = [];

app2.get('/artesanato', (request, response) => {
  response.json(artesanato);
});

app2.post('/artesanato', (request, response) => {
  // TODO: Desenvolver registro no array artesanato
  const {
    code, description, buyPrice, sellPrice, tags,
  } = request.body;
  const p = artesanato.find((v) => v.code == code);
  const lov = p ? p.lovers : 0;
  const produto = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: lov,
  };
  artesanato.push(produto);
  response.status(201).json(produto);
});

app2.put('/artesanato/:id', (request, response) => {
  // TODO: Desenvolver atualização de produto por ID
  const { id } = request.params;

  const {
    description, buyPrice, sellPrice, tags,
  } = request.body;

  const p = artesanato.find((v) => v.id == id);

  if (p) {
    p.description = description;
    p.buyPrice = buyPrice;
    p.sellPrice = sellPrice;
    p.tags = tags;

    response.json(p);
  } else {
    response.status(400).send();
  }
});

app2.delete('/artesanato/:code', (request, response) => {
  const { code } = request.params;
  const index = artesanato.findIndex((v) => v.code == code);

  if (index == -1) {
    response.status(400).send();
  } else {
    artesanato = artesanato.filter((v) => v.code != code);
    response.status(204).send();
  }
});

app2.post('/artesanato/:code/love', (request, response) => {
  const { code } = request.params;

  const p = artesanato.find((v) => v.code == code);

  if (!p) {
    response.status(400).send();
  } else {
    artesanato.filter((v) => v.code == code)
      .map((val) => val.lovers += 1);

    response.json({
      lovers: p.lovers,
    });
  }
});

app2.get('/artesanato/:code', (request, response) => {
  // TODO: Desenvolver busca de produtos por código

  const { code } = request.params;
  const index = artesanato.findIndex((v) => v.code == code);

  if (index == -1) {
    response.status(400).send();
  } else {
    artesanato = artesanato.filter((v) => v.code != code);
    response.status(204).send();
  }
});

export default app2;
