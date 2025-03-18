import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('bosslootToken');
  // If there is a token, clone the request and add the token to the header
  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    // Continue with the cloned request
    return next(clonedRequest);
  }
  
  // If there is no token, continue with the original request
  return next(req);
};
