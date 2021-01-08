import { REQUEST_URL } from 'Constants/server';

export const userApi = {
  fetchByCode: code =>
    fetch(`${REQUEST_URL}/user/authentication/code?code=${code}`)
};
