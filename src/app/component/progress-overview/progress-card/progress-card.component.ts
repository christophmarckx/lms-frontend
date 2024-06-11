import {Component, Input, Renderer2, ElementRef, inject, AfterViewInit} from '@angular/core';
import {StudentWithProgress} from "../../../models/student/student-with-progress";

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.css'
})
export class ProgressCardComponent implements AfterViewInit {
  @Input() studentWithProgress: StudentWithProgress;
  @Input() isPair!: boolean;
  private renderer: Renderer2 = inject(Renderer2);
  private elementRef: ElementRef = inject(ElementRef);

  ngAfterViewInit() {
    this.setWidth();
  }

  setWidth() {
    const progressIndicatorElement = document.getElementById(this.studentWithProgress.student.id);
    if (progressIndicatorElement) {
      this.setStyle(progressIndicatorElement, 0);
      setTimeout(() => this.setStyle(progressIndicatorElement, this.calculateWidth()), 500);
    }
  }

  calculateWidth() {
    return Math.floor((this.studentWithProgress.actualProgression / this.studentWithProgress.totalProgression) * 100);
  }

  setStyle(progressIndicatorElement: HTMLElement, width: number) {
    this.renderer.setStyle(progressIndicatorElement, 'transition', 'all 1000ms ease-in-out');
    this.renderer.setStyle(progressIndicatorElement, 'width', `${width}%`);
    this.renderer.setStyle(progressIndicatorElement, 'height', '100%');
    this.renderer.setStyle(progressIndicatorElement, 'border-radius', '25px');
    this.setColor(progressIndicatorElement, width);
  }

  setColor(progressIndicatorElement: HTMLElement, width: number) {
    if (width < 25) {
      this.renderer.setStyle(progressIndicatorElement, 'background-color', '#ee4e50');
    } else if (width < 50) {
      this.renderer.setStyle(progressIndicatorElement, 'background-color', '#f46546');
    } else if (width < 75) {
      this.renderer.setStyle(progressIndicatorElement, 'background-color', '#e4de2d');
    } else if (width < 100) {
      this.renderer.setStyle(progressIndicatorElement, 'background-color', '#b1e42d');
    } else {
      this.renderer.setStyle(progressIndicatorElement, 'background-color', '#08c400');
    }
  }
}
