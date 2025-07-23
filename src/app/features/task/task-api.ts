import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './model/task';
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
}
