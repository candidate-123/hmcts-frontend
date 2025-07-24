import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadComponent: () => import("./features/task/pages/tasks").then(m => m.Tasks) },
  { path: 'tasks/:id/edit', loadComponent: () => import("./features/task/pages/task-edit/task-edit").then(m => m.TaskEdit) },
  { path: 'tasks/:id/deleteTask', loadComponent: () => import("./features/task/pages/task-delete/task-delete").then(m => m.TaskDelete) },
  { path: 'error', loadComponent: () => import("./core/pages/error/error").then(m => m.Error) }

];
