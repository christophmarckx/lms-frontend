import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {ClassgroupWithMembers} from "../../models/classgroup/classgroup-with-members";
import {ClassgroupService} from "../../services/classgroup/classgroup.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserRole} from '../../models/authentication/authenticated-user';
import {LoadingSpinnerComponent} from "../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-classgroup-overview',
  standalone: true,
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf,
        RouterLink,
        UserCardComponent,
        LoadingSpinnerComponent
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
