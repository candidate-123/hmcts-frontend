import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error } from './error'; // your component
import { ActivatedRoute } from '@angular/router';

describe('ErrorComponent', () => {
  let fixture: ComponentFixture<Error>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => {
                  const queryParams: any = {
                    status: '404',
                    message: 'Page not found'
                  };
                  return queryParams[key];
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Error);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the correct status and message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Status: 404');
    expect(compiled.textContent).toContain('Message: Page not found');
  });
});
