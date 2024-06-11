import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnrollStudentFormComponent} from './enroll-student-form.component';

describe('EnrollStudentFormComponent', () => {
  let component: EnrollStudentFormComponent;
  let fixture: ComponentFixture<EnrollStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollStudentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
