import { TestBed } from '@angular/core/testing';

import { TaskApi } from './task-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from './model/task';
import { API_URL } from './task-api.token';

describe('TaskApi', () => {
  let service: TaskApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskApi,
        { provide: API_URL, useValue: 'http://api.test/api' }
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
