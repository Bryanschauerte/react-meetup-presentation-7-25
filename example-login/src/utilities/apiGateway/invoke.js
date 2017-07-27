
import { config } from '../../hidden/cognito';
import { apiConfig } from './apiGatewayConfig';

export async function invokeApig(
  { path,
    method = 'GET',
    body }, userToken) {
    console.log('invoke a pig', userToken);
    const url = `${apiConfig.url}${path}`;
    const headers = {
        Authorization: userToken
    };

    body = (body) ? JSON.stringify(body) : body;

    const results = await fetch(url, {
        method,
        body,
        headers
    });

    if (results.status !== 200) {
        throw new Error(await results.text());
    }

    return results.json();
}
