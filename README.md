# HmctsFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

Angular project to consume HMCTS case management Java Springboot backend.


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/candidate-123/hmcts-frontend.git
   cd hmcts-frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Dependencies
node: >22
Angular 20
govuk

## Usage

### Running
To start the project
```bash
npm start
```

### Available Scripts
- **Start**: Run.
  ```bash
  ng serve
  ```
- **Lint**: Check for code style issues.
  ```bash
  npm run lint
  ```
- **Test**: Run unit tests.
  ```bash
  npm test
  ```
- **Build**: Build for production.
  ```bash
  ng build
  ```



## Notes
- [x] Will add global error handler
- [ ] Complete TaskEdit unit tests
- [ ] Unit test TaskDelete
- [ ] Modify delete TaskDelete. already gets an id in route param no need to pass as queryParam 
- [ ] Add pagination and Filtering
- [ ] Add clear button on taskEdit form Description
Research govuk style and components for use in app
Workflow could be imporved with additional features - like generic confimation page instead of feature specific deletes etc.
http errors will be handled globally and redirect to specific page