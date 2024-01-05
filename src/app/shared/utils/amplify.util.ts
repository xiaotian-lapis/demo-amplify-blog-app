import { get } from 'aws-amplify/api';

export const getResponseJsonFromAmplifyApi = async<T> (
  apiName: string,
  apiPath: string,
  authorizationToken?: string
): Promise<T> => {
  try {
    let options: any = {
        apiName: apiName,
        path: apiPath,
      };

    if (authorizationToken) {
      options = {
        ...options,
        headers: {
          Authorization: authorizationToken,
        },
      };
    }

    const restOperation = get(
      options
    );
    console.log('GET call succeeded with options: ', options);
    const response = await restOperation.response;
    return await response.body.json() as T;

  } catch (error) {
    console.error('GET call failed: ', error);
    throw error;
  }
};
