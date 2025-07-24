import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      // Navigate to the error page with query params
      router.navigate(['/error'], {
        queryParams: {
          status: error.status,
          message: error.error?.message || error.message
        }
      });

      return throwError(() => error);
    })
  );
};
