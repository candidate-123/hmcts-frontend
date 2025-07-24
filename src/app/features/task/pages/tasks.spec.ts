import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tasks } from './tasks';
import { TaskApi } from '../task-api';
import { of } from 'rxjs';
import { Task } from '../model/task';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('Tasks component', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Test Task' } as Task,
    { id: 2, title: 'Test Task 2' } as Task,
  ];

  const mockTaskApi = {
    getTasks: jasmine.createSpy('getTasks').and.returnValue(of(mockTasks))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasks, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TaskApi, useValue: mockTaskApi }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should receive a list of tasks from service', () => {

    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].title).toBe('Test Task');
    expect(mockTaskApi.getTasks).toHaveBeenCalled();
  });

  it('should render a row for each task in the template', () => {
    mockTaskApi.getTasks.and.returnValue(of(mockTasks));

    fixture.detectChanges();

    const list = fixture.debugElement.queryAll((By.css('tr[data-testid="output-row"]')));
    const myTasks = list.map(l => l.nativeElement.textContent);

    expect(myTasks.length).toBe(2);
  });


  it('should render loading indicator', () => {
    mockTaskApi.getTasks.and.returnValue(of(mockTasks));

    fixture.componentInstance.isLoading = true;
    fixture.detectChanges();


    const loader = fixture.debugElement.query(By.css('div[aria-live="polite"]'));

    expect(loader.nativeElement.textContent).toMatch(/loading/i);
  });

});
