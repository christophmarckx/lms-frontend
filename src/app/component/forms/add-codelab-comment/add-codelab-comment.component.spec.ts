import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodelabCommentComponent } from './add-codelab-comment.component';

describe('AddCodelabCommentComponent', () => {
  let component: AddCodelabCommentComponent;
  let fixture: ComponentFixture<AddCodelabCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCodelabCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCodelabCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
