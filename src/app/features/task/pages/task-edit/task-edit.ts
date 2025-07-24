import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApi } from '../../task-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../../model/task';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskStatus } from '../../model/task-status';

@Component({
  selector: 'app-task-edit',
  imports: [FormsModule],
  templateUrl: './task-edit.html',
  styles: ``
})
export class TaskEdit implements OnInit {
  isLoading: boolean = false;
  task: Task = { status: TaskStatus.INCOMPLETE } as Task;
  statuses = Object.values(TaskStatus);

  route = inject(ActivatedRoute);
  router = inject(Router);
  taskService = inject(TaskApi);
  destroyRef = inject(DestroyRef);
  type = 'task';

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const taskId = this.route.snapshot.params['id'];
    if (taskId > 0) {
      this.isLoading = true;
      this.taskService.getTaskById(taskId)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(task => {
          this.task = task;
          this.isLoading = false;
        });
    }
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      // Could scroll to error summary here but form is quite short so just return
      return;
    }
    this.isLoading = true;
    const { year, month, day } = this.task;
    const task = { ...this.task, dateDue: new Date(year!, month! - 1, day!) };
    task.id > 0 ? this.updateTask(task) : this.createTask(task);
  }

  createTask(task: Task) {
    this.taskService.createTask(task)
      .subscribe(() => {
        this.router.navigate(['/']);
        this.isLoading = false;
      });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(this.task.id, task)
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/']);
      });
  }

  deleteTask() {
    this.router.navigate(['/tasks', this.task.id, 'deleteTask']);
  }

}
