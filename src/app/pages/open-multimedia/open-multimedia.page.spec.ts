import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenMultimediaPage } from './open-multimedia.page';

describe('OpenMultimediaPage', () => {
  let component: OpenMultimediaPage;
  let fixture: ComponentFixture<OpenMultimediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMultimediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMultimediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
