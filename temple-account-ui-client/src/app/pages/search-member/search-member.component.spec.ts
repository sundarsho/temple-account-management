import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMemberComponent } from './search-member.component';

describe('SearchUserComponent', () => {
  let component: SearchMemberComponent;
  let fixture: ComponentFixture<SearchMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
