# 📋 Task Manager App

A modern task management application built with Ionic + Angular, focused on clean architecture, reusable components, Firebase integration, and scalable UI design.

---

## 🚀 Features

### ✅ Task Management

- Create, complete, and delete tasks
- Separate views for pending and completed tasks
- Real-time task counters (total, pending, completed)
- Clear completed tasks in bulk

### 🏷️ Categories

- Create custom categories with colors
- Assign tasks to categories
- Filter tasks by category
- Category usage counter
- Delete categories with confirmation

### ⚡ Quick Add

- Fast task creation with category selection
- Keyboard support (Enter to submit)
- Inline category picker

### 🎨 UI / UX

- Modern Ionic design system
- Reusable, modular UI components
- Responsive layout (mobile-first)
- Smooth animations and transitions
- Clear empty states with contextual actions
- Visual feedback for all interactions

### 💾 Data Persistence

- LocalStorage/IndexedDB integration via storage service
- Firebase integration for remote data sync
- Remote configuration service

---

## 📸 UI Screenshots

### Main Dashboard

![Stats and Categories](https://res.cloudinary.com/dcnnkawbe/image/upload/v1768340642/localhost_4200__gdo5hg.png)

The main view displays:

- **Stats Summary**: Total, pending, and completed task counts
- **Category Management**: Create and manage task categories
- **Active Filters**: Visual indicators for applied filters

### Category Creation

![Create Category](https://res.cloudinary.com/dcnnkawbe/image/upload/v1768340888/localhost_4200__4_xghuqu.png)

Simple category creation flow:

- Enter category name
- Select color tag for visual identification
- Instant feedback and validation

### Task Creation

![Create Task](https://res.cloudinary.com/dcnnkawbe/image/upload/v1768340707/localhost_4200__2_qzk8bi.png)

Quick task creation interface:

- Enter task title
- Select category from dropdown
- Fast keyboard submission (Enter key)

### Task Lists

![Task Lists](https://res.cloudinary.com/dcnnkawbe/image/upload/v1768340794/localhost_4200__3_emx4cn.png)

Organized task display:

- **In Progress**: Pending tasks with category badges
- **Completed**: Finished tasks with clear visual distinction
- Toggle completion status with a tap
- Delete individual tasks or clear all completed

---

## 🧱 Architecture Overview

The project follows a feature-based architecture with clear separation of concerns.

```
src/
├── app/
│   ├── core/
│   │   ├── firebase/
│   │   │   ├── firebase.config.ts
│   │   │   ├── firebase.service.ts
│   │   │   └── remote-config.service.ts
│   │   ├── models/
│   │   │   ├── category.model.ts
│   │   │   └── task.model.ts
│   │   └── storage/
│   │       └── storage.ts
│   ├── features/
│   │   └── tasks/
│   │       ├── components/
│   │       │   ├── category-management/
│   │       │   ├── quick-add-task/
│   │       │   ├── stats-summary/
│   │       │   ├── task-item/
│   │       │   ├── tasks-filter/
│   │       │   ├── tasks-header/
│   │       │   └── tasks-section/
│   │       ├── pages/
│   │       │   └── task-list/
│   │       └── services/
│   │           ├── category.service.ts
│   │           └── task.service.ts
│   ├── shared/
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── theme/
    ├── _index.scss
    ├── _mixins.scss
    ├── _variables.scss
    └── variables.css
```

### Key Design Decisions

**Core Module**

- Centralized models, storage abstraction, and Firebase configuration
- Reusable across features without circular dependencies

**Feature-based Structure**

- All task-related logic lives in `features/tasks/`
- Components are granular and single-purpose
- Services handle business logic and state management

**Component Separation**

- **task-item**: Encapsulates individual task rendering and interactions
- **tasks-section**: Groups tasks by status (pending/completed)
- **tasks-header**: Reusable page header component
- **stats-summary**: Displays task metrics
- **category-management**: Handles category CRUD operations
- **tasks-filter**: Category-based filtering UI
- **quick-add-task**: Fast task creation interface

**Page-level (task-list.component)**

- Orchestrates component interactions
- Manages global state and filters
- Handles layout and composition only

**Signals & Reactive State (Angular)**

- Used for reactive data flow
- Computed values for filtered and derived state
- Efficient change detection

---

## 🧩 Component Architecture

### TaskItemComponent

Reusable component responsible for displaying a single task with category badge.

```html
<app-task-item
  [task]="task"
  variant="pending"
  [categoryName]="category.name"
  [categoryColor]="category.color"
  (toggle)="toggleTask($event)"
  (remove)="deleteTask($event)"
/>
```

### TasksSectionComponent

Groups tasks by status with section header and optional bulk actions.

```html
<app-tasks-section
  variant="completed"
  icon="checkmark-done-outline"
  [title]="'Completed'"
  [tasks]="completedTasks"
  [categories]="categories"
  [showAction]="true"
  (action)="clearCompleted()"
  (toggle)="toggleTask($event)"
  (remove)="deleteTask($event)"
/>
```

### CategoryManagementComponent

Manages category creation and deletion with visual feedback.

```html
<app-category-management
  [categories]="categories"
  [tasks]="tasks"
  (create)="createCategory($event)"
  (delete)="confirmDeleteCategory($event)"
/>
```

### QuickAddTaskComponent

Inline task creation with category selection.

```html
<app-quick-add-task [categories]="categories" (create)="onCreateTask($event)" />
```

---

## 📦 Tech Stack

- **Angular 18+** (Signals, Standalone Components)
- **Ionic Framework 8+**
- **Firebase** (Backend services & Remote Config)
- **SCSS** (Component-scoped styles with theme system)
- **TypeScript**
- **RxJS** (Reactive programming)

---

## 🧪 Current Status

### ✔ Implemented

- Complete UI architecture with 7 specialized components
- Task and category CRUD operations
- Filtering and real-time stats
- Component separation and reusability
- Clean and maintainable styles with theme system
- Firebase integration and storage abstraction
- Responsive mobile-first design
- Empty states and user feedback

### ⏳ Pending (Future Enhancements)

- Task editing functionality
- Task reordering (drag & drop)
- Task due dates and reminders
- Search functionality
- Unit and E2E tests
- Dark mode support
- Multi-user support with Firebase Auth

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Ionic CLI

### Install dependencies

```bash
npm install
```

### Configure Firebase (Optional)

Update `src/environments/environment.ts` with your Firebase credentials.

### Run the app

```bash
ionic serve
```

### Build for production

```bash
ionic build --prod
```

---

## 📁 Project Structure Highlights

**Services**

- `task.service.ts`: Task business logic and state management
- `category.service.ts`: Category operations and state
- `firebase.service.ts`: Firebase integration
- `storage.ts`: Storage abstraction layer

**Models**

- `task.model.ts`: Task entity definition
- `category.model.ts`: Category entity definition

**Theme System**

- Custom SCSS variables and mixins
- Ionic CSS variables for consistent styling
- Responsive breakpoints and utilities

---

## 📌 Notes

This project demonstrates:

- **Clean Architecture**: Clear separation of concerns with core, features, and shared modules
- **Component Design**: Single-responsibility, reusable components
- **Scalable CSS**: Theme system with SCSS mixins and Ionic variables
- **Modern Angular**: Signals, standalone components, and reactive patterns
- **Real-world Patterns**: Service layer, state management, and data persistence
- **Professional UI/UX**: Empty states, loading indicators, and contextual feedback

---

## 👨‍💻 Author

**Jorge Armando Morales**  
Software Developer

---

## 📄 License

This project is part of a technical challenge showcase.
