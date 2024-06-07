import {Component, inject, Input, OnInit} from '@angular/core';
import {Codelab} from "../../../models/codelab/codelab";
import {RouterLink} from "@angular/router";
import {CodelabProgress} from "../../../models/codelab/codelab-progress";
import {KeyValue, KeyValuePipe} from "@angular/common";
import {CodelabService} from "../../../services/codelab/codelab.service";
import {PopupService} from "../../../services/popup/popup.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-codelabs-card',
  standalone: true,
  imports: [
    RouterLink,
    KeyValuePipe,
    FormsModule
  ],
  templateUrl: './codelabs-card.component.html',
  styleUrl: './codelabs-card.component.css'
})
export class CodelabsCardComponent implements OnInit {
  codelabService = inject(CodelabService);
  popupService = inject(PopupService);

  @Input() codelab : Codelab;
  selectedCodelabProgress: CodelabProgress;

  protected readonly CodelabProgress = CodelabProgress;

  ngOnInit(): void {
    this.selectedCodelabProgress = this.codelab.progress;
  }

  sortProgressCodelabByOriginalOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return 0;
  }

  updateProgress(codelabId: string) {
    this.codelabService.updateCodelabProgress(codelabId, this.selectedCodelabProgress)
      .subscribe({
        next: codelab => {
          this.popupService.showPopup("Codelab progress updated")
        },
        error: err => {
          console.error("Error during update", err)
        }
      });
  }
}
