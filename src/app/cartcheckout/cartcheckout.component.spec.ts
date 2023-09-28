import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartcheckoutComponent } from './cartcheckout.component';

describe('CartcheckoutComponent', () => {
  let component: CartcheckoutComponent;
  let fixture: ComponentFixture<CartcheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartcheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
