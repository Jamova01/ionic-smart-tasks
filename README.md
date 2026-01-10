# 📋 Task Manager App

A modern task management application built with Ionic + Angular, focused on clean architecture, reusable components, and scalable UI design.

---

## 🚀 Features

### ✅ Task Management

- Create, complete, and delete tasks
- Separate views for pending and completed tasks
- Real-time task counters (total, pending, completed)

### 🏷️ Categories

- Create custom categories with colors
- Assign tasks to categories
- Filter tasks by category
- Category usage counter

### ⚡ Quick Add

- Fast task creation with category selection
- Keyboard support (Enter to submit)

### 🎨 UI / UX

- Modern Ionic design
- Reusable UI components
- Responsive layout (mobile-first)
- Smooth animations and transitions
- Clear empty states and feedback

---

## 🧱 Architecture Overview

The project follows a feature-based architecture with clear separation of concerns.

```
src/
├── app/
│   └── features/
│       └── tasks/
│           ├── components/
│           │   └── task-item/
│           │       ├── task-item.component.ts
│           │       ├── task-item.component.html
│           │       └── task-item.component.scss
│           ├── pages/
│           │   └── task-list/
│           │       ├── task-list.component.ts
│           │       ├── task-list.component.html
│           │       └── task-list.component.scss
│           └── models/
│               └── task.model.ts
```

### Key Design Decisions

**TaskItemComponent**

- Encapsulates all task rendering logic and styles, improving reusability and reducing duplication.

**Page-level styles (task-list.component.scss)**

- Handle layout, sections, and containers only.
- No task-specific UI logic is handled at the page level.

**Signals & reactive state (Angular)**

- Used to manage tasks, filters, and derived state efficiently.

---

## 🧩 Components

### TaskItemComponent

Reusable component responsible for:

- Displaying a single task
- Handling toggle (complete / uncomplete)
- Handling delete action
- Styling based on task state (pending / completed)

```html
<app-task-item
  [task]="task"
  variant="pending"
  [categoryName]="category.name"
  [categoryColor]="category.color"
  (toggle)="toggleTask($event)"
  (delete)="deleteTask($event)"
/>
```

---

## 📦 Tech Stack

- Angular
- Ionic Framework
- SCSS (component-scoped styles)
- Angular Signals
- Reactive Forms

---

## 🧪 Current Status

### ✔ Implemented

- UI architecture
- Task and category management
- Filtering and stats
- Component separation
- Clean and maintainable styles

### ⏳ Pending (Phase 3)

- Data persistence (e.g. LocalStorage / IndexedDB / Firebase)
- Task ordering
- Edit task functionality
- Unit tests

---

## 🛠️ Getting Started

**Install dependencies**

```bash
npm install
```

**Run the app**

```bash
ionic serve
```

---

## 📌 Notes

This project is intentionally structured to demonstrate:

- Clean component design
- Scalable CSS architecture
- Real-world Angular patterns
- Clear separation between UI, state, and layout

---

## 👨‍💻 Author

**Jorge Armando Morales**  
Software Developer
