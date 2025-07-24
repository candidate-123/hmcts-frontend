import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadComponent: () => import("./features/task/pages/tasks").then(m => m.Tasks) },
  { path: 'tasks/:id/edit', loadComponent: () => import("./features/task/pages/task-edit/task-edit").then(m => m.TaskEdit) }

];
