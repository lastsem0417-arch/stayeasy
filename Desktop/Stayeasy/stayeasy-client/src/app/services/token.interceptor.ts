import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // 🔥 ONLY attach token if it exists AND url is protected
  if (token && !req.url.endsWith('/api/rooms')) {
    req = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  return next(req);
};