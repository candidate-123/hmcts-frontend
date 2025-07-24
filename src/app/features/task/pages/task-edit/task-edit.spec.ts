import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEdit } from './task-edit';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskApi } from '../../task-api';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from '../../model/task';

describe('TaskEdit', () => {
  let component: TaskEdit;
  let fixture: ComponentFixture<TaskEdit>;
  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: 1
      }
    }
  };

  const fakeTask = { id: 1, title: 'Test Task', status: 'INCOMPLETE', dateDue: '2025-07-25' };

  const mockTaskApi = {
    getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(fakeTask)),
    createTask: jasmine.createSpy(),
    updateTask: jasmine.createSpy()
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEdit, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TaskApi, useValue: mockTaskApi },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not call getTaskById if id is not positive', () => {
    // Set up the negative ID BEFORE component is created
    mockActivatedRoute.snapshot.params.id = -1;

    component = fixture.componentInstance;

    // Spy reset to ensure clean call history
    mockTaskApi.getTaskById.calls.reset();

    // Trigger lifecycle
    fixture.detectChanges();

    expect(mockTaskApi.getTaskById).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should call getTaskById if id is positive', () => {
    mockActivatedRoute.snapshot.params.id = 1;

    fixture = TestBed.createComponent(TaskEdit);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(mockTaskApi.getTaskById).toHaveBeenCalledWith(1);
  });

  it('should call createTask and navigate to root on success', () => {
    const mockTask = { id: 1, title: 'New Task', status: 'INCOMPLETE', dateDue: new Date('2025-07-25') };


    mockTaskApi.createTask = jasmine.createSpy().and.returnValue(of(null));

    component.createTask(mockTask);

    expect(mockTaskApi.createTask).toHaveBeenCalledWith(mockTask);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading).toBeFalse();
  });

  it('should call updateTask with correct params and navigate to root on success', () => {
    const updatedTask = { id: 1, title: 'Updated Task', status: 'INCOMPLETE', dateDue: new Date('2025-07-25') };

    mockTaskApi.updateTask = jasmine.createSpy().and.returnValue(of(null));
    mockRouter.navigate.calls.reset();

    // Optional: simulate loading state
    component.task = updatedTask;
    component.isLoading = true;

    component.updateTask(updatedTask);

    expect(mockTaskApi.updateTask).toHaveBeenCalledWith(1, updatedTask);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    expect(component.isLoading).toBeFalse();
  });

  it('should call createTask with constructed date if form is valid and id is 0', () => {
    const fakeForm = { invalid: false } as NgForm;

    const createTaskSpy = spyOn(component, 'createTask');
    const updateTaskSpy = spyOn(component, 'updateTask');

    component.task = {
      id: 0,
      title: 'My Task',
      status: 'INCOMPLETE',
      year: 2025,
      month: 7,
      day: 24
    } as Task;

    component.submitForm(fakeForm);

    expect(component.isLoading).toBeTrue();
    expect(createTaskSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 0,
      dateDue: new Date(2025, 6, 24) // month - 1
    }));
    expect(updateTaskSpy).not.toHaveBeenCalled();
  });

  it('should call updateTask if id > 0 and form is valid', () => {
    const fakeForm = { invalid: false } as NgForm;

    const createTaskSpy = spyOn(component, 'createTask');
    const updateTaskSpy = spyOn(component, 'updateTask');

    component.task = {
      id: 99,
      title: 'Update Me',
      status: 'COMPLETE',
      year: 2025,
      month: 8,
      day: 1
    } as Task;

    component.submitForm(fakeForm);

    expect(updateTaskSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 99,
      dateDue: new Date(2025, 7, 1)
    }));
    expect(createTaskSpy).not.toHaveBeenCalled();
  });

  it('should return early if form is invalid', () => {
    const fakeForm = { invalid: true } as NgForm;

    const createTaskSpy = spyOn(component, 'createTask');
    const updateTaskSpy = spyOn(component, 'updateTask');

    component.submitForm(fakeForm);

    expect(createTaskSpy).not.toHaveBeenCalled();
    expect(updateTaskSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();

  });


  it('should navigate to deleteTask route with correct query params', () => {

    mockRouter.navigate.calls.reset();
    fixture.detectChanges();
    component.deleteTask();

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/tasks', 1, 'deleteTask']
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
