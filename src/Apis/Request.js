import { REQUEST_URL } from 'Constants/server';
import { responselog } from 'lib/Utils/log-utils';

export const request = async (url, option) => {
  const res = await fetch(`${REQUEST_URL}${url}`, option);
  const data = await res.json();
  responselog('data', data);
  return data;
};
