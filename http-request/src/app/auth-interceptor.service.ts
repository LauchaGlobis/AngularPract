import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptorService implements HttpInterceptor{

      intercept(req: HttpRequest<any>, next: HttpHandler){
            console.log('Request is on its way');
            console.log(req.url);
            const modifiedRequest = req.clone({
              headers: req.headers.append('Auth', 'xyz')
            });
            return next.handle(modifiedRequest);
            /*Lo que hace en modifiedRequest es agregar un header auth ficticio, es decir
            si nuestra url en realidad necesita un header específico en todos los casos para funcionar
            esta es una buena práctica de agregarlo desde el interceptor y ya se acopla automáticamente
            en todos sus llamados */
      }
}
