import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { NotificationService } from "../services/notification.service";
import { User } from "../models/user";
import { SessionStorageService } from "../services/session-storage.service";
import { MessageService } from "primeng/api";

export class HttpErrorInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "";
  constructor(
    protected _notificationSvc: NotificationService,
    protected loaderSvc: LoaderService,
    private localService: SessionStorageService,
    protected messageService: MessageService,
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (!request.headers.has("Content-Type")) {
    //   request = request.clone({
    //     headers: request.headers.set("Content-Type", "application/json"),
    //   });
    // }

    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        this.loaderSvc.hide();
        let errorMessage = "Something went wrong, please try again !";
       
        // if (error.error instanceof ErrorEvent) {
        if (error.error && error.error.message) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this._notificationSvc.error("Error", errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const user: any = this.localService.getItem<User>("user");
    this.token = user && user.accessToken;
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }
    return request.clone({
      headers: request.headers.set(
        this.AUTH_HEADER,
        `${(user && user.tokenType) || "Bearer"} ` + this.token
      ),
    });
  }
}
