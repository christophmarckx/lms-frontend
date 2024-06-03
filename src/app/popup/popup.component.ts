import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Input() message!: string | null;
  @Input() isErrorPopup!: boolean;

  hide() {
    this.message = null;
  }
}
