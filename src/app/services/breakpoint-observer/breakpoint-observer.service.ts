import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { QUERY_BREAKPOINTS } from '@constants';
import { fromEvent, Observable } from 'rxjs';
import {
  startWith,
  map,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private _size$!: Observable<string>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this._size$ = fromEvent(window, 'resize').pipe(
        startWith(this._getScreenSize() as any),
        map((_) => {
          return this._getScreenSize();
        }),
        distinctUntilChanged(),
        shareReplay(1)
      );
    }
  }

  public get size$(): Observable<string> {
    return this._size$;
  }

  private _getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(
      QUERY_BREAKPOINTS.entries()
    ).filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }
}
