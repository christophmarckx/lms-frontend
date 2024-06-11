import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewCodelabComponent} from './view-codelab.component';

describe('ViewCodelabComponent', () => {
  let component: ViewCodelabComponent;
  let fixture: ComponentFixture<ViewCodelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCodelabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCodelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
