const app = require('../src/app4');
const jwt = require('jsonwebtoken');
const request = require('supertest');


it('Deve verificar o token e responder com status de 200', async () => {
    const jwtSpy = jest.spyOn(jwt, 'verify');
    jwtSpy.mockReturnValue('Some decoded token');

    const res = await request(app)
        .get('/verify-access-token')
        .set('access-token', 'somerandomjwttoken')
        .send({});

    expect(res.status).toEqual(200);

    });

it('Não deve verificar o token e responder com status de 401', async () => {
    const jwtSpy = jest.spyOn(jwt, 'verify');
    jwtSpy.mockImplementationOnce(() => { throw new Error('Invalid access token') });

    const res = await request(app)
        .get('/verify-access-token')
        .set('access-token', 'somerandomjwttoken')
        .send({});

        expect(res.status).toEqual(401);

});


