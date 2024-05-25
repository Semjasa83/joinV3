import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditCardComponent } from './contact-edit-card.component';

describe('ContactEditCardComponent', () => {
  let component: ContactEditCardComponent;
  let fixture: ComponentFixture<ContactEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactEditCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
