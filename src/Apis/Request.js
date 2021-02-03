import { REQUEST_URL } from 'Constants/server';
import { responselog } from 'lib/Utils/log-utils';

export const request = async (url, option) => {
  let isLoading = false;
  const res = await fetch(`${REQUEST_URL}/${url}`, option);
  const data = await res.json();
  isLoading = true;
  responselog('data', data);
  return data;
};
