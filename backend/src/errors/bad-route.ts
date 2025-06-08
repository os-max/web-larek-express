import { HTTPError } from "./base";

export class BadRoute extends HTTPError {
  constructor (message: string, status=404) {
    super(message, status);
  }
}