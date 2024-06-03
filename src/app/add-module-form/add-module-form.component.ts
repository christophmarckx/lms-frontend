import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModuleService} from "../services/module/module.service";
import {Module} from "../models/module";
import {NgForOf} from "@angular/common";
import {CreateModule} from "../models/CreateModule";
import {Router} from "@angular/router";
import {PopupService} from "../services/popup/popup.service";

@Component({
  selector: 'app-add-module-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-module-form.component.html',
  styleUrl: './add-module-form.component.css'
})
export class AddModuleFormComponent implements OnInit {
  private readonly popupService: PopupService = inject(PopupService);
  private readonly moduleService: ModuleService = inject(ModuleService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  modules : Module[];
  selectedParentModule : string;
  public isFormInvalid: boolean = true;
  public formControlNames : string[] = ['name', 'parentModuleId'];
  public createModuleError?: string;

  constructor() {
    this.createModuleForm.valueChanges.subscribe(() => this.onFormUpdate());
  }

  addModule(): void {
    if (this.isFormInvalid) {
      alert('The data you inserted is invalid. Try again!');
      return;
    }
     const rawValues = this.createModuleForm.getRawValue();
     const createModule: CreateModule = {
      name: rawValues.name!,
       parentModuleId: rawValues.parentModuleId ? rawValues.parentModuleId : null
     }

    this.moduleService.createModule(createModule).subscribe(
      (response) => {
        this.router.navigate(["modules"]);
        this.popupService.showPopup('The module has been successfully added');
      },
      (error) => {
        this.createModuleError = JSON.parse(error.error).message;
      }
    );
  }

  createModuleForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    parentModuleId: ['']
  })

  onFormUpdate() {
    this.isFormInvalid = this.createModuleForm.invalid;
  }

  ngOnInit(): void {
    this.moduleService.getAllModules().subscribe(module => {
      this.modules = module;
      this.modules.unshift({id: "", name: "<No parent module>", parentModule: null})
    });
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.createModuleForm.controls[controlName as keyof typeof this.createModuleForm.controls].hasError(errorName);
  }

  getError(controlName: string, errorName: string) {
    const {errors} = this.createModuleForm.controls[controlName as keyof typeof this.createModuleForm.controls];
    if (errors) {
      return errors[errorName];
    }
    return '';
  }
}
