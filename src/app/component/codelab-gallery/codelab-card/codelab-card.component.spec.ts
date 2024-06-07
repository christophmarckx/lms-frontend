import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelabCardComponent } from './codelab-card.component';

describe('CodelabCardComponent', () => {
  let component: CodelabCardComponent;
  let fixture: ComponentFixture<CodelabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodelabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
