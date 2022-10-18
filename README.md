## Code structure
```
📦src
 ┣ 📂components
 ┃ ┣ 📂employees
 ┃ ┃ ┣ 📜Employees.scss
 ┃ ┃ ┗ 📜Employees.tsx
 ┃ ┣ 📂modals
 ┃ ┃ ┣ 📜EmployeeModal.scss
 ┃ ┃ ┣ 📜EmployeeModal.tsx
 ┃ ┃ ┣ 📜EmployeeModalDelete.scss
 ┃ ┃ ┣ 📜EmployeeModalDelete.tsx
 ┃ ┃ ┣ 📜EmployeeModalEdit.scss
 ┃ ┃ ┗ 📜EmployeeModalEdit.tsx
 ┃ ┣ 📂pagination-box
 ┃ ┃ ┣ 📜Pagination.scss
 ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜user.scss
 ┃ ┃ ┗ 📜User.tsx
 ┣ 📂pages
 ┃ ┗ 📂dashboard
 ┃ ┃ ┣ 📂Filter
 ┃ ┃ ┃ ┣ 📜Filter.scss
 ┃ ┃ ┃ ┗ 📜Filter.tsx
 ┃ ┃ ┣ 📜Dashboard.scss
 ┃ ┃ ┗ 📜Dashboard.tsx
 ┣ 📂services
 ┃ ┗ 📜employee.ts
 ┣ 📂setting
 ┃ ┗ 📜const.ts
 ┣ 📜App.scss
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.scss
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
 ```
## guidence
# UI/UX
1. using mobile first approach for responsive design
2. Since every company has its own set of UI components and Icon library, the syntax are slightly different from each other, here I just use common html entity for those simple icons. They can be easily converted to customised UI libraries, such as fontAwesome/MaterialUI, etc...
3. Have some slight modification on the sample UI.
4. use 'rem' as units except borders

# Function/API
1. Since the tasks is for FE, only sample API is used, proper response is yet to be completed for some API, but the addressing methods are indicated in the code
2.