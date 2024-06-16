// @ts-nocheck
import { Request, Response, NextFunction } from "express";
import { routesConfig } from "../utils/routesConfig";
import { makeGetRequest , makePostRequest } from "../utils/request";

const PROTECTIION_TOKEN = 'protection-token';
const SUBSCRIPTION_TOKEN = 'subscription-status'

const getUserDetails = async (authHeader: string) => {
  const url = process.env.USER_DETAILS_URL;
  const options = {
    headers: { Authorization: authHeader },
  };
  //@ts-ignore
  const response = await new Promise((resolve, reject) =>
    needle.get(url, options, (err: Error | null, res: NeedleResponse) => {
      if (!err) {
        resolve(res?.body);
      } else {
        reject({ protectionToken: null, subscriptionToken: null });
      }
    })
  );
  // console.log("resp", response.data);
  return response.data;
};

const navigateToDesinatedService = async (
  req: Request,
  res: Response,
  redirectionUrl: string,
  path: string
) => {
  const method = req.method;

  const queryParams = req.query;

  const completeUrl = `${redirectionUrl}${path}`;
  const headers = req?.headers;
  const options = {
    ...(headers[PROTECTIION_TOKEN] && {[PROTECTIION_TOKEN]:headers[PROTECTIION_TOKEN]}),
    ...(headers[SUBSCRIPTION_TOKEN] && {[SUBSCRIPTION_TOKEN]:headers[SUBSCRIPTION_TOKEN]})
  }

// options.test = 'test'
// console.log('at navigate desination',path,redirectionUrl)
  const data = req?.body;
  if (method === "GET")
    return await makeGetRequest( queryParams,  completeUrl,options);
  else if(method === 'POST'){
    return await makePostRequest( queryParams, completeUrl, data, options);
  }
};

export const handleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const path = req.path.split("/");
  const service = path[1]; // TODO: has to be generic not dependent on indexes in the path
  const authHeader: string | undefined = req.get("Authorization");

  if (service in routesConfig) {
    const serviceConfigs = routesConfig[service as keyof typeof routesConfig];
    if (path.length > 1) {
      const subPath = path[2];
      //@ts-ignore // TODO : make appropriate types
      for (const [routeName, config] of Object.entries(
        //@ts-ignore
        serviceConfigs?.subUrl
      )) {
        //@ts-ignore
        console.log('service config',subPath,routeName)

        if (subPath === routeName) {
          if (config?.isProtected || config?.isSubscription) {
            if (authHeader === undefined) {
              res.status(401).send("UnAuthorized");
              return;
            }

            const { protectionToken, subscriptionToken } = await getUserDetails(
              authHeader
            );
            if (!protectionToken) {
              res.status(401).send("UnAuthorized");
              return;
            } else {
              req.headers[PROTECTIION_TOKEN] = protectionToken;
            }
            if (!subscriptionToken) {
              res.status(402).send("User Not Subscribed");
              return;
            } else {
              req.headers[SUBSCRIPTION_TOKEN] = subscriptionToken;
            }
          }
          const redirectionUrl = serviceConfigs?.redirectionURL;
          const proxiedRes = await navigateToDesinatedService(
            req,
            res,
            redirectionUrl,
            config.path
          );
          // console.log('pro',proxiedRes)
          return res.status(proxiedRes.statusCode || 200).send(proxiedRes);
        }
      }
    }
  }
  next();
};
