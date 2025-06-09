import HTTPError from './base';

export default class BadRoute extends HTTPError {
  constructor(message: string, status = 404) {
    super(message, status);
  }
}
