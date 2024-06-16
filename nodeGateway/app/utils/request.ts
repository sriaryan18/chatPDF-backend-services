//@ts-nocheck
import needle, { NeedleOptions, NeedleResponse } from "needle";

const getRequestUrl = (queryParams : object, url:string) => {
    const queryString = new URLSearchParams(queryParams);
   return `${url}?${queryString}`;
    
}

export const makeGetRequest = async (
  queryParams: any,
  url: string,
  headers?: any
) => {
  try {
    console.log('I am here',queryParams,url,headers)
    const response = await new Promise((resolve, reject) => {
      needle.get(
        getRequestUrl(queryParams,url),
        {
          headers,
        },
        (error: Error | null, response: NeedleResponse) => {
          if (!error) {
            resolve(response?.body);
          } else {
            console.log("ERROR", error);
            reject({
              status: 500,
              message: "Something went wrong",
            });
          }
        }
      );
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const makePostRequest = async (
  queryParams: any,
  url: string,
  data: any,
  headers?: any
) => {
    try {
        const response = await new Promise((resolve, reject) => {
          needle.post(
            getRequestUrl(queryParams,url),
            data,
            {
              headers,
            },
            (error: Error | null, response: NeedleResponse) => {
              if (!error) {
                resolve(response?.body);
              } else {
                console.log("ERROR", error);
                reject({
                  status: 500,
                  message: "Something went wrong",
                });
              }
            }
          );
        });
        return response;
      } catch (error) {
        throw error;
      }
};
