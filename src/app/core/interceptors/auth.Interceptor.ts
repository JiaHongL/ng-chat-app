import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { UserService } from "../../services/user.service";

import { Observable } from "rxjs";
import { inject } from "@angular/core";

const skipUrl = ['/api/users/login', '/api/users/register'];

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const userService = inject(UserService);
    const token = userService.getToken();
    
    const skip = skipUrl.some(url => req.url.includes(url));
    if (skip) {
        return next(req);
    }
    
    if (token) {
        const cloned = req.clone({
            setHeaders: {
                authorization: token,
            },
        });
        return next(cloned);
    } else {
        return next(req);
    }
};