import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.isLoggedIn.pipe(
        take(1),
        exhaustMap(user => {
          
            if (!user) {
                return next.handle(req);
            }
            return next.handle(req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + this.authService.getToken())
            }));
        })
    );
}
}
