import { ChangeDetectorRef, Injectable, ViewRef, computed, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, debounceTime, fromEvent, map, pairwise, startWith } from 'rxjs';

type View = 'friendList' | 'chatList' | 'chatWindow';

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  private startView: View = 'chatList';
  private _currentView = new BehaviorSubject<View>(this.startView);
  private previousView!: View;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  innerWidth = signal(window.innerWidth);

  isMobile = computed(() => {
    const innerWidth = this.innerWidth();
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isSmallScreen = innerWidth < 640;
    return isMobileDevice || isSmallScreen;
  });

  effectMobile = effect(() => {
    if (this.isMobile()) {
      this.goToFriendList();
    }
  });

  currentView$ = this._currentView.asObservable().pipe(
    startWith(this.startView),
    pairwise()
  );

  constructor() {
    this.currentView$.subscribe(([prev]) => {
      this.previousView = prev as View;
    });
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(
        debounceTime(200)
      )
      .subscribe((event: any) => {
        this.innerWidth.set(event?.target?.innerWidth);
      })
  }

  getCurrentView$() {
    return this._currentView.asObservable();
  }

  currentView() {
    return this._currentView.getValue();
  }

  goToChatView() {
    this._currentView.next('chatWindow');
  }

  goToFriendList() {
    this._currentView.next('friendList');
  }

  goToChatList() {
    this._currentView.next('chatList');
  }

  goBack() {
    this._currentView.next(this.previousView);
  }

  resetScroll(ms = 200) {
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, ms);
  }

}