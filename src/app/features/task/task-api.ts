import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapTask, Task } from './model/task';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './task-api.token';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {
  taskUrl = inject(API_URL);
  http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.taskUrl}/tasks`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.taskUrl}/tasks/${id}`)
      .pipe(
        map(task => mapTask(task))
      );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.taskUrl}/tasks`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.taskUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<number> {
    return this.http.delete<number>(`${this.taskUrl}/tasks/${id}`);
  }
}
