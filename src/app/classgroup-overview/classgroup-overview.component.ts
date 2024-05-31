import {Component, OnInit} from '@angular/core';
import {ClassgroupService} from "../services/classgroup/classgroup.service";
import {ActivatedRoute} from "@angular/router";
import {ClassgroupWithMembers} from "../models/ClassgroupWithMembers";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './classgroup-overview.component.html',
  styleUrl: './classgroup-overview.component.css'
})
export class ClassgroupOverviewComponent implements OnInit{
  classgroupWithMembers : ClassgroupWithMembers;

  constructor(
      private classgroupService : ClassgroupService,
      private route: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
    const classgroupId : string | null = this.route.snapshot.paramMap.get('classgroupId');
    if (classgroupId != null) {
      this.classgroupService.getClassgroup(classgroupId).subscribe(
        classgroupWithMembers => this.classgroupWithMembers = classgroupWithMembers
      )
    }
  }
}
