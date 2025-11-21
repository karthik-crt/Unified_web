import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthSearchComponent } from './health-search.component';

describe('HealthSearchComponent', () => {
  let component: HealthSearchComponent;
  let fixture: ComponentFixture<HealthSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
