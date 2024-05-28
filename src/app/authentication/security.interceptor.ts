import { HttpInterceptorFn } from '@angular/common/http';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
