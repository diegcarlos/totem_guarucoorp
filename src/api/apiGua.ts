import axios from 'axios';
import { Buffer } from 'buffer';
import { env } from '/env';
const api = axios.create({
  baseURL: env.GUARUCOORP_API.URL,
});

const login = async () => {
  const formDAta = new FormData();

  formDAta.append('perfil', '5');
  formDAta.append('usuario', 'VE9URU0yMDA=');
  formDAta.append('senha', 'VCQyOTHDpw==');

  const requestOptions = {
    method: 'POST',
    body: formDAta,
  };

  const resp = await fetch(
    'https://sisgescoop.guarucoop.com/api/login',
    requestOptions,
  );

  const dados = await resp.json();

  const token = Buffer.from(dados[0].token).toString('base64');
  return token;
};

export const apiGua = async ({
  method,
  url,
  data,
}: {
  method: 'post' | 'get' | 'delete' | 'patch' | 'postForm';
  url: string;
  data: any;
}) => {
  try {
    const token = await login();
    api.defaults.headers.token = token;

    const resp = await api[method](url, { ...data });

    return resp;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
};
