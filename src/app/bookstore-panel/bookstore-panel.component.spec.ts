import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookstorePanelComponent } from './bookstore-panel.component';

describe('BookstorePanelComponent', () => {
  let component: BookstorePanelComponent;
  let fixture: ComponentFixture<BookstorePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookstorePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookstorePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
