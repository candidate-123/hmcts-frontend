import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDelete } from './task-delete';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TaskApi } from '../../task-api';

describe('TaskDelete', () => {
  let fixture: ComponentFixture<TaskDelete>;
  let component: TaskDelete;
  let mockTaskApi: jasmine.SpyObj<TaskApi>;
  let router: Router;

  beforeEach(async () => {
    mockTaskApi = jasmine.createSpyObj('TaskApi', ['deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskDelete, RouterTestingModule],
      providers: [
        { provide: TaskApi, useValue: mockTaskApi },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDelete);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create and set id from route', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBe(1);
  });

  it('should call deleteTask and navigate after success', () => {
    mockTaskApi.deleteTask.and.returnValue(of(1));

    spyOn(router, 'navigate');

    component.deleteTask();

    expect(mockTaskApi.deleteTask).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

});
