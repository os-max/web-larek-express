import { CelebrateError, isCelebrateError } from 'celebrate';
import { Response, Request, NextFunction } from 'express';
import HTTPError from '../errors/base';

export default function errorHandler(
  error: CelebrateError | HTTPError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let status = 500;
  let message: CelebrateError | string = 'Internal server error';

  if (isCelebrateError(error)) {
    status = 400;
    message = error;
  } else {
    if (error.status) { status = error.status; }
    if (error.message) { message = error.message; }
  }

  return res.status(status).send({ message });
}
