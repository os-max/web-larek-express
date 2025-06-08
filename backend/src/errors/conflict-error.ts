import HTTPError from './base';

export default class ConflictError extends HTTPError {
  constructor(message: string, status = 409) {
    super(message, status);
  }
}
