import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./services/popup/popup.service";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LayoutComponent, FooterComponent, HeaderComponent, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'LMS-trapezium-frontend';
  public popupMessage: string | null = null;
  public isErrorPopup: boolean = false;
  private readonly popupService: PopupService = inject(PopupService);

  ngOnInit() {
    this.popupService.getPopupSubject().subscribe(({ message, isErrorPopup, duration }) => {
      this.popupMessage = message;
      this.isErrorPopup = isErrorPopup;
      setTimeout(() => {
        this.popupMessage = null;
        if (localStorage.getItem('loginErrorPopup') !== null) {
          localStorage.removeItem('loginErrorPopup');
        }
      }, duration);
    });
  }
}
