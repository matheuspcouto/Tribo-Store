import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModalConfirmacaoService {

  currentModal$ = new BehaviorSubject<{ title: string, message: string } | null>(null);
  action$ = new Subject<boolean>();
  lastFocusElement: Element | null = null;

  hide() {
    this.currentModal$.next(null);
    this.action$.next(false);
  }

  show({ title, message }: { title: string, message: string }): Promise<boolean> {
    this.lastFocusElement = document.activeElement;
    this.currentModal$.next( { title , message });

    return this.action$.pipe(
      take(1),
      tap(() => this.currentModal$.next(null)),
      tap(() => {
        if (this.lastFocusElement) {
          (this.lastFocusElement as any).focus();
        }
      })
    ).toPromise();
  }
}
