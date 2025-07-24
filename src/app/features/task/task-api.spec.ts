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
    const dummyTask: Task = { id: 1, title: 'Task 1', dateDue: new Date() } as Task;
    service.getTaskById(1)
      .subscribe(task => {
        expect(task.title).toBe('Task 1');
      });

    const req = httpMock.expectOne('http://api.test/tasks/' + dummyTask.id);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTask);
  });


  it('should create a new task and return with an id', () => {
    const newTask: Task = { title: 'Task 1' } as Task;
    service.createTask(newTask)
      .subscribe(task => {
        expect(task.id).toBe(1);
      });
    const req = httpMock.expectOne('http://api.test/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newTask, id: 1 });
  });

  it('should update a task with properties and return updated task', () => {
    const existingTask: Task = { id: 1, title: 'Task 1' } as Task;
    const updatedTask: Task = { ...existingTask, title: 'UPDATED' };

    service.updateTask(existingTask.id, updatedTask)
      .subscribe(task => {
        expect(task.title).toBe('UPDATED');
      });

    const req = httpMock.expectOne('http://api.test/tasks/' + existingTask.id);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...updatedTask, title: 'UPDATED' });
  });

  it('should delete a task passing id parameter', () => {
    const taskId = 1;
    service.deleteTask(taskId)
      .subscribe(id => {
        expect(id).toBe(1);
      });
    const req = httpMock.expectOne('http://api.test/tasks/' + taskId);
    expect(req.request.method).toBe('DELETE');
    req.flush(taskId);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
