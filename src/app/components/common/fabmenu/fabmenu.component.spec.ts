import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FabmenuComponent } from './fabmenu.component';

describe('FabmenuComponent', () => {
  let component: FabmenuComponent;
  let fixture: ComponentFixture<FabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabmenuComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
