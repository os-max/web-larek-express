import { HTTPError } from "./base";

export class BadRequestError extends HTTPError {
  constructor (message: string, status=400) {
    super(message, status);
  }
}