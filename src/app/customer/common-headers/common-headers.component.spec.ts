import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHeadersComponent } from './common-headers.component';

describe('CommonHeadersComponent', () => {
  let component: CommonHeadersComponent;
  let fixture: ComponentFixture<CommonHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
