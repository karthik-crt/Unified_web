import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAgentsComponent } from './manage-agents.component';

describe('ManageAgentsComponent', () => {
  let component: ManageAgentsComponent;
  let fixture: ComponentFixture<ManageAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
