import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { UserService } from "../../services/user.service";

import { Observable } from "rxjs";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const userService = inject(UserService);
    const token = userService.getToken();
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