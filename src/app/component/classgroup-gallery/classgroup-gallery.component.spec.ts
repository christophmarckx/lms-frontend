import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassgroupGalleryComponent} from './classgroup-gallery.component';

describe('ClassgroupGalleryComponent', () => {
  let component: ClassgroupGalleryComponent;
  let fixture: ComponentFixture<ClassgroupGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassgroupGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassgroupGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
