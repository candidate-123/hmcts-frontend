import { TestBed } from '@angular/core/testing';

import { TaskApi } from './task-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from './model/task';
import { API_URL } from './task-api.token';
import { environment } from '../../../environments/environment';

describe('TaskApi', () => {
  let service: TaskApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskApi,
        { provide: API_URL, useValue: 'http://api.test' }
      ],
    });
    service = TestBed.inject(TaskApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch a list of tasks', () => {
    const dummyTasks: Task[] = [{ id: 1, title: 'Task 1' } as Task];
    service.getTasks()
      .subscribe(tasks => {
        expect(tasks.length).toBe(1);
        expect(tasks).toEqual(dummyTasks);
      });

    const req = httpMock.expectOne('http://api.test/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should fetch a task', () => {
    const dummyTask: Task = { id: 1, title: 'Task 1' } as Task;
    service.getTaskById(1)
      .subscribe(task => {
        expect(task).toEqual(dummyTask);
      });

    const req = httpMock.expectOne('http://api.test/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTask);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
