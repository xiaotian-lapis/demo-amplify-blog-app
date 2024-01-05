import { get } from 'aws-amplify/api';

export const getResponseJsonFromAmplifyApi = async<T> (apiName: string, apiPath: string): Promise<T> => {
  try {
    const restOperation = get({
      apiName: apiName,
      path: apiPath,
    });
    console.log('GET call succeeded: ');
    const response = await restOperation.response;
    return await response.body.json() as T;

  } catch (error) {
    console.error('GET call failed: ', error);
    throw error;
  }
};
