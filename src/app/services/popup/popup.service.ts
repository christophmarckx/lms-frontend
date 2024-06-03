import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private readonly DEFAULT_DURATION: number = 5000;
  private popupSubject = new Subject<{ message: string, isErrorPopup: boolean, duration: number }>();
  constructor() { }

  showPopup(message: string, isErrorPopup: boolean = false, duration: number = this.DEFAULT_DURATION) {
    this.popupSubject.next({ message, isErrorPopup, duration });
  }

  getPopupSubject() {
    return this.popupSubject.asObservable();
  }
}
