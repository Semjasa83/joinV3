import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddCardComponent } from './contact-add-card.component';

describe('ContactAddCardComponent', () => {
  let component: ContactAddCardComponent;
  let fixture: ComponentFixture<ContactAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAddCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
