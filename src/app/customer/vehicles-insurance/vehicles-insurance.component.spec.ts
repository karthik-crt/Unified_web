import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesInsuranceComponent } from './vehicles-insurance.component';

describe('VehiclesInsuranceComponent', () => {
  let component: VehiclesInsuranceComponent;
  let fixture: ComponentFixture<VehiclesInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesInsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
