import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskApi } from '../task-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [RouterModule, DatePipe],
  templateUrl: './tasks.html',
  styles: ``
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = false;
  router = inject(Router);

  taskService = inject(TaskApi);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.isLoading = true;
    this.taskService.getTasks()
      .pipe(
        tap(() => this.isLoading = false),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(tasks => this.tasks = tasks);
  }

  createTask() {
    this.router.navigate(['/tasks/', -1, '/edit']);
  }

}
