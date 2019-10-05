import Router from "next/router";
import { ServerResponse } from "http";

export const redirect = (res: ServerResponse | undefined, location: string) => {
  if (res) {
    res.writeHead(302, { Location: location });
    res.end();
  } else {
    Router.push(location);
  }
};
