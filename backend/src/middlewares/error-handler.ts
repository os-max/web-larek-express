import { CelebrateError, isCelebrateError } from "celebrate";
import { HTTPError } from "../errors/base";
import { NextFunction, Request, Response } from "express";

export function errorHandler(error: CelebrateError | HTTPError, req: Request, res: Response, next: NextFunction) {
  let status = 500;
  let message: CelebrateError | string = 'Internal server error'

  if (isCelebrateError(error)) {
    status = 400;
    message = error;
  }
  else {
    if (error.status)
      status = error.status;
    if (message)
      message = error.message;
  }

  return res.status(status).send({ message });
}