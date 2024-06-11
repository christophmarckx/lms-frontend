import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateCodelabFormComponent} from './update-codelab-form.component';

describe('UpdateCodelabFormComponent', () => {
  let component: UpdateCodelabFormComponent;
  let fixture: ComponentFixture<UpdateCodelabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCodelabFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCodelabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
