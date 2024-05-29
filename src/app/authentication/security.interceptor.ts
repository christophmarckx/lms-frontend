import { HttpInterceptorFn } from '@angular/common/http';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem("access_token")
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
