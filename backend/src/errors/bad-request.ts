import HTTPError from './base';

export default class BadRequestError extends HTTPError {
  constructor(message: string, status = 400) {
    super(message, status);
  }
}
