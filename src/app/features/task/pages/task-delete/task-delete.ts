import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskApi } from '../../task-api';


@Component({
  selector: 'app-task-delete',
  imports: [RouterModule],
  template: `
  <h1 class="govuk-heading-l">Delete {{ type }}?</h1>
<p class="govuk-body">Are you sure you want to delete this {{ type }}? This action cannot be undone.</p>

<div class="govuk-button-group">
  <button class="govuk-button govuk-button--warning" (click)="deleteTask()" [disabled]="isLoading">
    {{ isLoading ? 'Deleting...' : 'Yes, delete' }}
  </button>
  <a routerLink="/{{ type }}s/{{ id }}" class="govuk-link">Cancel</a>
</div>
  `,
  styles: ``
})
export class TaskDelete implements OnInit {

  id!: number;
  isLoading = false;
  type = 'task';
  taskService = inject(TaskApi);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe({
      next: () => this.router.navigate([`/${this.type.toLowerCase()}s`]),
    });
  }
}
