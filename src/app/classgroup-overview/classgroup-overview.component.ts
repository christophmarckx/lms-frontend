import {Component, OnInit} from '@angular/core';
import {ClassgroupService} from "../services/classgroup/classgroup.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ClassgroupWithMembers} from "../models/ClassgroupWithMembers";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserRole} from "../model/authentication/AuthenticatedUser";
import {AuthenticationService} from "../services/authentication/authentication.service";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './classgroup-overview.component.html',
  styleUrl: './classgroup-overview.component.css'
})
export class ClassgroupOverviewComponent implements OnInit{
  classgroupWithMembers! : ClassgroupWithMembers;
  constructor(
      private classgroupService : ClassgroupService,
      private route: ActivatedRoute,
      public authenticationService : AuthenticationService
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

  protected readonly UserRole = UserRole;
}
