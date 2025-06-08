import HTTPError from './base';

export default class InternalServerError extends HTTPError {
  constructor(message: string = 'Internal server error', status = 500) {
    super(message, status);
  }
}
