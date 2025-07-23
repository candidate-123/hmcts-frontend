import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tasks } from './tasks';
import { TaskApi } from '../task-api';
import { of } from 'rxjs';
import { Task } from '../model/task';
import { By } from '@angular/platform-browser';

describe('Tasks component', () => {
  let component: Tasks;
  let fixture: ComponentFixture<Tasks>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Test Task' } as Task
  ];

  const mockTaskApi = {
    getTasks: jasmine.createSpy('getTasks').and.returnValue(of(mockTasks))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tasks],
      providers: [
        { provide: TaskApi, useValue: mockTaskApi }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tasks);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should receive a list of tasks from service', () => {

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test Task');
    expect(mockTaskApi.getTasks).toHaveBeenCalled();
  });

  it('should render an li for each hero in the template', () => {
    mockTaskApi.getTasks.and.returnValue(of(mockTasks));

    fixture.detectChanges();

    const list = fixture.debugElement.queryAll(By.css('li'));
    const myTasks = list.map(l => l.nativeElement.textContent);

    expect(myTasks.length).toBe(1);
  });

});
