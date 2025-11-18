import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueryFormComponent } from './inquery-form.component';

describe('InqueryFormComponent', () => {
  let component: InqueryFormComponent;
  let fixture: ComponentFixture<InqueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InqueryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InqueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
