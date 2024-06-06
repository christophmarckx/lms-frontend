import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgroupCardComponent } from './classgroup-card.component';

describe('ClassgroupCardComponent', () => {
  let component: ClassgroupCardComponent;
  let fixture: ComponentFixture<ClassgroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassgroupCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassgroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
