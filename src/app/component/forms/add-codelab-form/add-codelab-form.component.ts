import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {CodelabService} from "../../../services/codelab/codelab.service";
import {ProcessErrorPipe} from "../../../pipe/process-error.pipe";
import {ModuleService} from "../../../services/module/module.service";
import {PopupService} from "../../../services/popup/popup.service";
import {CreateCodelab} from "../../../models/codelab/create-codelab";
import {Module} from "../../../models/module/module";
import {LoadingSpinnerComponent} from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-add-codelab-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        AsyncPipe,
        ProcessErrorPipe,
        LoadingSpinnerComponent
    ],
  templateUrl: './add-codelab-form.component.html',
  styleUrl: './add-codelab-form.component.css'
})
export class AddCodelabFormComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  codelabService: CodelabService = inject(CodelabService);
  moduleService: ModuleService = inject(ModuleService);
  popupService: PopupService = inject(PopupService);
  router: Router = inject(Router);
  isFormInvalid: boolean = true;
  modules: Module[];
  createCodelabForm: FormGroup;
  createCodelabError?: string;


  getModules(): void {
    this.moduleService.getAllModules().subscribe(module => this.modules = module);
  }

  ngOnInit() {
    this.getModules();
    this.createCodelabForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description:  ['', [Validators.minLength(2), Validators.maxLength(255)]],
      moduleId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]]
    });
    this.createCodelabForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  onFormUpdate() {
    this.isFormInvalid = this.createCodelabForm.invalid || !this.createCodelabForm.touched;
  }

  onCodelabChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.createCodelabForm.patchValue({
      moduleId: selectedId
    });
  }

  addCodelab() {
    if (this.isFormInvalid) {
      this.popupService.showPopup('Data is not valid');
      return;
    }
    const rawValues = this.createCodelabForm.getRawValue();
    const createCodelab: CreateCodelab = {
      name: rawValues.name!,
      description: rawValues.description!,
      parentModuleId: rawValues.moduleId!
    }
    this.codelabService.createCodelab(createCodelab).subscribe(
      (response) => {
        this.popupService.showPopup("Codelab created!")
        ;
        this.router.navigate(['/codelabs']);
      },
      (response) => {
        this.createCodelabError = response.error.errors;
      }
    );
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createCodelabForm.controls[controlName as keyof typeof this.createCodelabForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
