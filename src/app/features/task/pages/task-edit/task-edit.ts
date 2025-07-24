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
  isLoading = false;
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
    const day = Number(this.task.day);
    const month = Number(this.task.month);
    const year = Number(this.task.year);

    const date = new Date(year, month - 1, day);
    const isValidDate =
      !isNaN(day) && !isNaN(month) && !isNaN(year) &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    const errorObj = isValidDate ? null : { invalidDate: true };

    // Apply shared error to each field
    form.controls['due-date-day']?.setErrors(errorObj);
    form.controls['due-date-month']?.setErrors(errorObj);
    form.controls['due-date-year']?.setErrors(errorObj);
    if (form.invalid || !isValidDate) {

      return;
    }
    this.isLoading = true;

    const task = { ...this.task, dateDue: new Date(year!, month! - 1, day!) };
    if (task.id > 0)
      this.updateTask(task);
    else
      this.createTask(task);
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

  isValidDate(day: number, month: number, year: number): boolean {
    // Ensure values are integers
    if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
      return false;
    }

    // Month in JavaScript Date is 0-based (0 = January)
    const date = new Date(year, month - 1, day);

    // Validate by checking if date parts match
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }


}
