# CLAUDE.md

# Accounting Tracker

This is an Accounting Office Management System.

The project is intended for a small accounting office (single company), not multi-tenant.

---

# Tech Stack

Frontend

- React 19
- Vite
- React Router DOM
- TailwindCSS
- React Icons
- SweetAlert2
- React Hot Toast

Backend

- Express.js
- Prisma ORM
- MySQL (MariaDB adapter)
- JWT Authentication

---

# Folder Structure

src/

components/

- auth/
- common/
- dashboard/
- layout/

pages/

- auth/
- dashboard/
- customers/
- taxes/
- tasks/
- reports/
- users/

layouts/

store/

utils/

---

# UI Style Guide

Use TailwindCSS only.

Card

```
bg-white
rounded-2xl
border
shadow-sm
p-6
```

Input

```
rounded-xl
border
px-4
py-3
focus:ring-2
focus:ring-blue-500
```

Primary Button

```
bg-blue-600
hover:bg-blue-700
text-white
rounded-xl
```

Danger Button

```
bg-red-600
hover:bg-red-700
text-white
rounded-xl
```

Never use inline CSS.

---

# Shared Components

Always reuse these components.

components/common/

- Button
- Breadcrumb
- ConfirmModal
- EmptyState
- InfoRow
- PageHeader
- SearchInput
- StatusBadge
- Tabs

Do not recreate duplicate components.

---

# Current Pages

Authentication

- Login

Dashboard

- Dashboard

Customer

- CustomerList
- CustomerDetail
- CustomerCreate
- CustomerEdit
- CustomerForm

Tax

- MonthlyTaxList
- MonthlyTaxDetail
- AnnualTaxList
- AnnualTaxDetail

Task

- WorkBoard
- WorkDetail

Reports

- Reports

User

- UserManagement

---

# Current Routes

/login

/

/users

/customers

/customers/new

/customers/:id

/customers/:id/edit

/taxes/monthly

/taxes/monthly/:id

/taxes/annual

/taxes/annual/:id

/tasks

/tasks/:id

/reports

---

# Customer Module

Customer has

- code
- name
- taxId
- businessType
- phone
- email
- address
- primaryStaff
- secondaryStaff
- status
- remark

CustomerCreate and CustomerEdit reuse CustomerForm component.

---

# Monthly Tax Module

MonthlyTaxList

User selects

- Month
- Year

Table

- Customer
- Responsible Staff
- ภงด.1
- ภงด.3
- ภงด.53
- ภงด.54
- ภพ.30
- ภพ.36
- Social Security
- Update Button

MonthlyTaxDetail

Editable

- Status
- Submitted Date
- Remark

Save uses SweetAlert2.

Back button returns to MonthlyTaxList.

---

# Annual Tax Module

AnnualTaxList

User selects

Year

Table

- Customer
- Responsible Staff
- ภงด.50
- ภงด.51
- Financial Statement
- Update Button

AnnualTaxDetail

Editable

- Status
- Submitted Date
- Remark

Save uses SweetAlert2.

---

# Work Module

Purpose

Track current work assigned to employees.

WorkBoard

Columns

- No
- Customer
- Responsible Staff
- Expense Month
- Income Month
- Bank Reconciliation Month
- Status
- Updated
- Update Button

Update button opens

/tasks/:id

WorkDetail

Employee updates

Expense

Month

Year

Income

Month

Year

Bank Reconciliation

Month

Year

Status

Remark

Save button

Uses SweetAlert2

After save

Navigate back to WorkBoard.

---

# Customer Detail

Tabs

Overview

Tax

Current Work

Documents

History

---

# Toast

Use react-hot-toast.

Success

```
toast.success(...)
```

Error

```
toast.error(...)
```

---

# Modal

Use reusable ConfirmModal component.

Do not create another modal component.

---

# Alerts

Use SweetAlert2.

Delete

Save

Confirmation

Use

Confirm

Cancel

Cancel button

Red

Confirm button

Blue

---

# Navigation

Always include Breadcrumb

except

Login

Dashboard

---

# Backend

Express

Prisma

MySQL (MariaDB adapter)

JWT

REST API

---

# Database

Prisma models already designed

User

Customer

ContactPerson

CustomerAssignment

CustomerDocument

MonthlyTax

AnnualTax

Task

TaxCalendar

ActivityLog

---

# API Convention

Response

Success

```
{
  success:true,
  data:{}
}
```

Error

```
{
 success:false,
 message:"..."
}
```

---

# Coding Rules

Use Functional Components only.

Prefer hooks.

Keep components reusable.

Split large pages into reusable components.

Never duplicate UI.

Avoid hardcoded styles.

Prefer reusable Button component.

---

# Naming

Component

PascalCase

Variables

camelCase

Constants

UPPER_CASE

---

# Future Roadmap

Dashboard KPI

- Total Customers
- Pending Monthly Tax
- Pending Annual Tax
- Current Tasks
- Upcoming Deadlines

Dashboard Charts

Reports

- Monthly Tax Report
- Annual Tax Report
- Customer Report
- Staff Workload

Document Management

- Upload Documents
- Download Documents
- Customer Files

User Management

- CRUD
- Role Management
- Customer Assignment

Notifications

Settings

Authentication

API Integration

---

# Important

This project targets production quality.

Do not simplify UI.

Keep design modern.

Use reusable components whenever possible.

Always preserve existing folder structure.

Avoid breaking routes.

Prefer maintainability over quick fixes.