import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddClassgroupFormComponent} from './add-classgroup-form.component';

describe('AddClassgroupFormComponent', () => {
  let component: AddClassgroupFormComponent;
  let fixture: ComponentFixture<AddClassgroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClassgroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassgroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
