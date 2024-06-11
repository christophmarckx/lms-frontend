import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModuleCodelabsComponent} from './module-codelabs.component';

describe('ModuleCodelabsComponent', () => {
  let component: ModuleCodelabsComponent;
  let fixture: ComponentFixture<ModuleCodelabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleCodelabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCodelabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
