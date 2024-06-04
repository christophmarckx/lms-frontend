import {Component, inject, Input, OnInit} from '@angular/core';
import {CodelabService} from "../services/codelab.service";
import {Codelab} from "../models/Codelab";
import {Course} from "../models/Course";
import {AddCodelabCommentComponent} from "./add-codelab-comment/add-codelab-comment.component";

@Component({
  selector: 'app-view-codelab',
  standalone: true,
  imports: [
    AddCodelabCommentComponent
  ],
  templateUrl: './view-codelab.component.html',
  styleUrl: './view-codelab.component.css'
})
export class ViewCodelabComponent implements OnInit{

  codelabService: CodelabService = inject(CodelabService);

  codelab: Codelab;

  @Input() id!: string;

  ngOnInit() {
    this.codelabService.getCodelab(this.id).subscribe(codelab => this.codelab = codelab);
  }

}
