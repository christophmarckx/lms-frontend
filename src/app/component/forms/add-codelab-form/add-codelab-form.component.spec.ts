import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCodelabFormComponent} from './add-codelab-form.component';

describe('AddCodelabFormComponent', () => {
  let component: AddCodelabFormComponent;
  let fixture: ComponentFixture<AddCodelabFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCodelabFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCodelabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
