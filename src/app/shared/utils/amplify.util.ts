import { get } from 'aws-amplify/api';

export const getResponseJsonFromAmplifyApi = async<T> (
  apiName: string,
  apiPath: string,
  authorizationToken?: string
): Promise<T> => {
  try {

    let requestOptions: any = {
      apiName: apiName,
      apiPath: apiPath,
    };

    let options: any = undefined;
    if (authorizationToken) {
      options = {
        headers: {
          'Content-Type' : 'application/json',
          Authorization: authorizationToken,
        },
      };
    }

    console.log('GET call succeeded: with options: ', options);

    const GetOperation = get(
      {
        apiName,
        path: apiPath,
        options
      }
    );

    const response = await GetOperation.response;
    return (await response.body.json()) as T;

  } catch (error) {
    console.error('GET call failed: ', error);
    throw error;
  }
};
