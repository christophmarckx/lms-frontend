import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModuleService} from "../services/module.service";
import {Module} from "../models/module";
import {NgForOf} from "@angular/common";
import {CreateModule} from "../models/CreateModule";

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
export class AddModuleFormComponent implements OnInit{
  modules : Module[];
  selectedParentModule : string;
  public isFormInvalid: boolean = true;
  public formControlNames : string[] = ['name', 'parentModuleId'];
  public createModuleError?: string;

  constructor(private moduleService : ModuleService,
              private formBuilder: FormBuilder,) {
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

     console.log("Test " + createModule);
    this.moduleService.createModule(createModule).subscribe(
      // (error) => {
      //   this.createModuleError = JSON.parse(error.error).message;
      // }
    );
  }

  createModuleForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    parentModuleId: ['']
  })

  onFormUpdate() {
    this.isFormInvalid = this.createModuleForm.invalid || !this.createModuleForm.touched;
  }

  ngOnInit(): void {
    this.moduleService.getAllModules().subscribe(module => {
      this.modules = module;
      this.modules.unshift({id: "", name: "<No parent module>", parentModule: null})
    });
  }

  selectParentModule() : void {
    console.log("salut")
    //this.selectedParentModule = id;
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
