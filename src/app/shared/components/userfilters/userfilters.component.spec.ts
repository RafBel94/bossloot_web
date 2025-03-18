import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfiltersComponent } from './userfilters.component';

describe('UserfiltersComponent', () => {
  let component: UserfiltersComponent;
  let fixture: ComponentFixture<UserfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserfiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
