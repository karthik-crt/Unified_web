import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManageCustomerComponent } from './agent-manage-customer.component';

describe('AgentManageCustomerComponent', () => {
  let component: AgentManageCustomerComponent;
  let fixture: ComponentFixture<AgentManageCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentManageCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentManageCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
