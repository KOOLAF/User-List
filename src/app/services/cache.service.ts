import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.getCache(req.url);

    if (cachedResponse) {
      return of(
        new HttpResponse({
          body: cachedResponse.body,
          status: 200,
          statusText: 'OK',
        })
      );
    } else {
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.setCache(req.url, event);
          }
        })
      );
    }
  }

  private getCache(key: string): HttpResponse<any> | null {
    const cachedResponse = this.cache.get(key);
    return cachedResponse ? cachedResponse.clone() : null;
  }

  private setCache(key: string, value: HttpResponse<any>): void {
    this.cache.set(key, value.clone());
  }
}
