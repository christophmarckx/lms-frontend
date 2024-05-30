import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleGalleryComponent} from './module-gallery.component';

describe('ModuleGalleryComponent', () => {
  let component: ModuleGalleryComponent;
  let fixture: ComponentFixture<ModuleGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
