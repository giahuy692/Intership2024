# Git
-Sau khi hoàn tất công việc trong 1 ngày/buổi, commit theo cú pháp 
<task>-<layer>-<action>: <message>. 
  <task>: tên của component/feature/module hoặc task.
  <layer>: UI/html/css/js/api/business/dto ...
  <action>: add/update/delete/fix ...
  <message>: nội dung công việc đã làm, miêu tả để người khác đọc dễ hiểu.
VD: ListProduct-JS-Add: Thêm script xử lý đọc danh sách sản phẩm từ localStorage.

-Trước khi merge nhánh vào dev, 
  checkout tại nhánh của mình,
  fetch/pull nhánh dev trước để xem có bản mới ko, 
  merge dev vào nhánh của mình, 
  push nhánh của mình to origin,
  checkout sang dev,
  merge nhánh của mình vào dev,
  push nhánh dev to origin,  
  checkout sang nhánh của mình.

# AngularV16

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## NPM When First Pull
npm i --legacy-peer-deps
