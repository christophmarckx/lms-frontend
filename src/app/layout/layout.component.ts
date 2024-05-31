import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {PopupComponent} from "../popup/popup.component";
import {PopupService} from "../services/popup/popup.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, PopupComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  public popupMessage: string | null = null;
  public isErrorPopup: boolean = false;
  private readonly popupService: PopupService = inject(PopupService);

  ngOnInit() {
    this.popupService.getPopupSubject().subscribe(({ message, isErrorPopup, duration }) => {
      this.popupMessage = message;
      this.isErrorPopup = isErrorPopup;
      setTimeout(() => this.popupMessage = null, duration);
    });
  }
}
