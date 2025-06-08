import { HTTPError } from "./base";

export class ConflictError extends HTTPError {
  constructor (message: string, status=409) {
    super(message, status);
  }
}