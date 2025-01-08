import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestTypeComponent } from './assest-type.component';

describe('AssestTypeComponent', () => {
  let component: AssestTypeComponent;
  let fixture: ComponentFixture<AssestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssestTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
