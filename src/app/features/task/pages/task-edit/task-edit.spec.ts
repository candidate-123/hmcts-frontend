import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEdit } from './task-edit';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskApi } from '../../task-api';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('TaskEdit', () => {
  let component: TaskEdit;
  let fixture: ComponentFixture<TaskEdit>;
  let mockActivatedRoute: any;

  const fakeTask = { id: 1, title: 'Test Task', status: 'INCOMPLETE', dateDue: '2025-07-25' };

  const mockTaskApi = {
    getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(fakeTask)),
    createTask: jasmine.createSpy()
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  mockActivatedRoute = {
    snapshot: {
      params: {
        id: 42
      }
    }
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


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
