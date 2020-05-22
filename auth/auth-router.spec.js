const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('register and login posts', () => {
    describe('POST /register', () => {
        beforeEach(async () => {
            return db('users').truncate();
        });
        test('returns true', () => {
            expect(true).toBe(true);
        });

        it('should return 201 success', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'password',
                })
                .then((res) => {
                    expect(res.status).toBe(201);
                });
        });
        it('should throw a 500 for invalid password', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'testuser2', password: 111111 })
                .then((res) => {
                    expect(res.status).toBe(500);
                });
        });
    });

    describe('POST /login', () => {
        it('should return 401 for invalid credentials', async () => {
            const credentials = { username: '', password: '' };
            const res = await request(server)
                .post('/api/auth/login')
                .send(credentials);
            expect(res.status).toBe(401);
        });
        it('should return 401 for incorrect but valid credentials', async () => {
            const credentials = { username: 'testuser', password: 'password' };
            const res = await request(server)
                .post('/api/auth/login')
                .send(credentials);
            expect(res.status).toBe(401)
        });
    });
});
