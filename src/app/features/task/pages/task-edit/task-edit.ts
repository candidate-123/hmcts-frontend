import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApi } from '../../task-api';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-edit',
  imports: [],
  templateUrl: './task-edit.html',
  styles: ``
})
export class TaskEdit implements OnInit {
  isLoading: boolean = false;
  task: Task = {} as Task;

  route = inject(ActivatedRoute);
  router = inject(Router);
  taskService = inject(TaskApi);
  destroyRef = inject(DestroyRef);
  type = 'task';

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
  }

  getTask(): void {
    const taskId = this.route.snapshot.params['id'];
    if (taskId > 0) {
      this.isLoading = true;
      this.taskService.getTaskById(taskId)
        .pipe(
          tap(() => this.isLoading = false),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(task => this.task = task);
    }
  }

}
