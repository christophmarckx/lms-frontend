import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Codelab} from "../models/Codelab";
import {ModuleService} from "../services/module.service";
import {Module} from "../models/Module";
import {CreateCodelab} from "../models/CreateCodelab";
import {CodelabService} from "../services/codelab.service";

@Component({
  selector: 'app-add-codelab-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './add-codelab-form.component.html',
  styleUrl: './add-codelab-form.component.css'
})
export class AddCodelabFormComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  codelabService: CodelabService = inject(CodelabService);
  moduleService: ModuleService = inject(ModuleService);
  router: Router = inject(Router);
  formControlNames: string[] = ['name', 'courseId'];
  isFormInvalid: boolean = true;
  modules: Module[];
  createCodelabError?: string;

  getModules(): void {
    this.moduleService.getAllModules().subscribe(module => this.modules = module);
  }

  ngOnInit() {
    this.getModules();
  }

  createCodelabForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description:  ['', [Validators.minLength(2), Validators.maxLength(255)]],
    moduleId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]]
  });

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
      alert('The data that you inserted is not valid. Try again!');
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
        this.router.navigate(['']);
      },
      (error) => {
        this.createCodelabError = JSON.parse(error.error).message;
      }
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.createCodelabForm.controls[controlName as keyof typeof this.createCodelabForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createCodelabForm.controls[controlName as keyof typeof this.createCodelabForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
