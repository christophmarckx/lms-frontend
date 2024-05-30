import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleWithCoursesComponent } from './module-with-courses.component';

describe('ModuleWithCoursesComponent', () => {
  let component: ModuleWithCoursesComponent;
  let fixture: ComponentFixture<ModuleWithCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleWithCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleWithCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
