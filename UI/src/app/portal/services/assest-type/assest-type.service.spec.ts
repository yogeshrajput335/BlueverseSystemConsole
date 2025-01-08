import { TestBed } from '@angular/core/testing';
import { AssestTypeService } from './assest-type.service';



describe('AssestTypeService', () => {
  let service: AssestTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssestTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
