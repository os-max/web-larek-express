import { NextFunction, Request, Response } from 'express';
import BadRoute from '../errors/bad-route';

export default function badRouteHandler(req: Request, _res: Response, next: NextFunction) {
  return next(new BadRoute(`Маршрут ${req.method} ${req.url} не найден`));
}
