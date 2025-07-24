import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEdit } from './task-edit';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskApi } from '../../task-api';
import { Task } from '../../model/task';
import { of } from 'rxjs';

describe('TaskEdit', () => {
  let component: TaskEdit;
  let fixture: ComponentFixture<TaskEdit>;

  const mockTask: Task =
    { id: 1, title: 'Test Task' } as Task;

  const mockTaskApi = {
    getTasks: jasmine.createSpy('getTaskById').and.returnValue(of(mockTask))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEdit, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TaskApi, useValue: mockTaskApi }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
