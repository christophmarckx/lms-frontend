import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CodelabsCardComponent} from './codelabs-card.component';

describe('CodelabsCardComponent', () => {
  let component: CodelabsCardComponent;
  let fixture: ComponentFixture<CodelabsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelabsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
