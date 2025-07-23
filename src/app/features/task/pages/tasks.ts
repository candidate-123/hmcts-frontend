import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskApi } from '../task-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styles: ``
})
export class Tasks implements OnInit {
  tasks: Task[] = [];

  taskService = inject(TaskApi);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(tasks => this.tasks = tasks);
  }


}
