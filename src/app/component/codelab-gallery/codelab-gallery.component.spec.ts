import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CodelabGalleryComponent} from './codelab-gallery.component';

describe('CodelabGalleryComponent', () => {
  let component: CodelabGalleryComponent;
  let fixture: ComponentFixture<CodelabGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodelabGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodelabGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
