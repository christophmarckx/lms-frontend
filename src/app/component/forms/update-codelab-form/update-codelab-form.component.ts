import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CodelabService} from "../../../services/codelab/codelab.service";
import {Codelab} from "../../../models/codelab/codelab";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpdateCodelab} from "../../../models/codelab/update-codelab";
import {PopupService} from "../../../services/popup/popup.service";
import {ModuleService} from "../../../services/module/module.service";
import {Module} from "../../../models/module/module";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-update-codelab.ts-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './update-codelab-form.component.html',
  styleUrl: './update-codelab-form.component.css'
})
export class UpdateCodelabFormComponent implements OnInit{
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly codelabService : CodelabService = inject(CodelabService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly popupService: PopupService = inject(PopupService);
  private readonly moduleService: ModuleService = inject(ModuleService);
  public isFormInvalid: boolean = true;
  public codelab!: Codelab;
  public formControlNames: string[] = ['name', 'description', 'moduleId'];
  @Input() id: string;
  modules: Module[] = [];
  public updateCodelabError?: string;

  ngOnInit() {
    this.getCodelabById(this.id);
    this.getModules();
  }

  constructor() {
    this.updateCodelabForm.valueChanges.subscribe(() => this.onFormUpdate())
  }

  onFormUpdate() {
    this.isFormInvalid = this.updateCodelabForm.invalid;
  }


  private getCodelabById(s: string) {
    if (!this.id) return;
    this.codelabService.getCodelab(this.id).subscribe(
        codelab => {
          console.log(codelab)
          this.codelab = codelab;
          this.updateCodelabForm.controls["name"].setValue(codelab.name);
          this.updateCodelabForm.controls["description"].setValue(codelab.description);
          this.updateCodelabForm.controls["moduleId"].setValue(codelab.module.id);

        });
  }

  updateCodelabForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: [''],
    moduleId: ['', [Validators.required]]
  });

  updateCodelab() : void {
    if(this.isFormInvalid){
      alert('The data that you inserted is not valid. Try again!');
      return;
    }
    const rawValues = this.updateCodelabForm.getRawValue();
    const updateCodelab: UpdateCodelab = {
      name: rawValues.name!,
      description: rawValues.description === undefined ? null : rawValues.description,
      moduleId: rawValues.moduleId!
    }
    this.codelabService.updateCodelab(this.id, updateCodelab).subscribe(
      (response) => {
        this.router.navigate(['']);
        this.popupService.showPopup('The codelab has been successfully updated');
      },
      (error) => {
        this.updateCodelabError = JSON.parse(error.error).message;
      }
    )
  }

  private getModules() {
    this.moduleService.getAllModules().subscribe(modules => this.modules = modules)
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.updateCodelabForm.controls[controlName as keyof typeof this.updateCodelabForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.updateCodelabForm.controls[controlName as keyof typeof this.updateCodelabForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
