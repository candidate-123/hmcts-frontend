import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-error',
  template: `
    <div class="govuk-error-summary" role="alert" aria-labelledby="error-summary-title">
      <h2 class="govuk-error-summary__title" id="error-summary-title">Something went wrong</h2>
      <div class="govuk-error-summary__body">
        @if (status) {
          <p>Status: {{ status }}</p>
        }
        @if (message) {
          <p>Message: {{ message }}</p>
        }
        
    
      </div>
    </div>
  `,
  styles: []
})
export class Error {
  route = inject(ActivatedRoute);
  status = this.route.snapshot.queryParamMap.get('status');
  message = this.route.snapshot.queryParamMap.get('message');
}
