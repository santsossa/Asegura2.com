import { describe, test } from 'node:test';
import assert from 'node:assert';
import { fakerES as faker } from '@faker-js/faker';

const fakeUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ max: 90 }),
    password: faker.string.hexadecimal()
  };
};

const apiURL = 'http://localhost:3000/api/users';

describe('TESTS API USERS', () => {
  let userRegister = null;
  let cookieToken = null;

  test('[/register]', async () => {
    const body = fakeUser();

    userRegister = {
      email: body.email,
      password: body.password
    };

    const response = await fetch(`${apiURL}/register`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const responseAPI = await response.json();
    console.log(responseAPI);
    assert.strictEqual(response.status, 201, 'El registro debería ser exitoso');
  });

  test('[/login]', async () => {
    const response = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegister),
      credentials: 'include'
    });

    const responseAPI = await response.json();
    assert.ok(responseAPI.token, 'El token debería estar presente en la respuesta');
    const setCookieHeader = response.headers.get('Set-Cookie');
    assert.ok(setCookieHeader, 'El header set-cookie debería estar en la respuesta');
    assert.ok(setCookieHeader.includes('token='));
    cookieToken = setCookieHeader.split(';')[0];
    console.log(cookieToken);
  });

  test('[/current]', async () => {
    const response = await fetch(`${apiURL}/current`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieToken
      },
      credentials: 'include'
    });
    const responseAPI = await response.json();
    console.log(responseAPI);
    assert.strictEqual(responseAPI.user.email, userRegister.email, 'El email del usuario debería coincidir');
  });
});