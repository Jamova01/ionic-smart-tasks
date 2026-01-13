import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AlertController, IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { StatsSummaryComponent } from '../components/stats-summary/stats-summary.component';
import { TasksHeaderComponent } from '../components/tasks-header/tasks-header.component';
import { CategoryManagementComponent } from '../components/category-management/category-management.component';
import { TasksFilterComponent } from '../components/tasks-filter/tasks-filter.component';
import { QuickAddTaskComponent } from '../components/quick-add-task/quick-add-task.component';
import { TasksSectionComponent } from '../components/tasks-section/tasks-section.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    StatsSummaryComponent,
    TasksHeaderComponent,
    CategoryManagementComponent,
    TasksFilterComponent,
    QuickAddTaskComponent,
    TasksSectionComponent,
    IonButton,
    IonContent,
    IonIcon,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly categoryService = inject(CategoryService);
  private readonly alertController = inject(AlertController);

  readonly tasks = this.taskService.tasks;
  readonly categories = this.categoryService.categories;
  readonly selectedCategoryFilter = signal<string | null>(null);

  readonly vm = computed(() => {
    const tasks = this.tasks();
    const filter = this.selectedCategoryFilter();
    const filtered = filter ? tasks.filter((t) => t.categoryId === filter) : tasks;
    const completed = filtered.filter((t) => t.completed);
    const pending = filtered.filter((t) => !t.completed);

    return {
      filtered,
      completed,
      pending,
      completedCount: completed.length,
      pendingCount: pending.length,
      hasNoTasks: filtered.length === 0,
      hasPendingTasks: pending.length > 0,
      hasCompletedTasks: completed.length > 0,
      pendingSubtitle: this.buildTaskSubtitle(pending.length, 'to complete'),
      completedSubtitle: this.buildTaskSubtitle(completed.length, 'done'),
    };
  });

  readonly selectedCategory = computed(() => {
    const categoryId = this.selectedCategoryFilter();
    return categoryId ? this.getCategoryById(categoryId) : null;
  });

  onCreateTask(data: { title: string; categoryId: string }): void {
    this.taskService.addTask(data.title, data.categoryId);
  }

  toggleTask(taskId: string): void {
    this.taskService.toggleTask(taskId);
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  clearCompleted(): void {
    this.taskService.clearCompleted();
  }

  onFilterChange(categoryId: string | null): void {
    this.selectedCategoryFilter.set(categoryId);
  }

  createCategory(data: { name: string; color: string }): void {
    this.categoryService.addCategory(data.name, data.color);
  }

  async confirmDeleteCategory(categoryId: string): Promise<void> {
    const category = this.getCategoryById(categoryId);
    const count = this.getTaskCountByCategory(categoryId);

    if (!category) return;

    const alert = await this.alertController.create({
      header: 'Delete Category',
      message: this.buildDeleteCategoryMessage(category.name, count),
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.deleteCategory(categoryId),
        },
      ],
    });

    await alert.present();
  }

  deleteCategory(categoryId: string): void {
    if (this.selectedCategoryFilter() === categoryId) {
      this.onFilterChange(null);
    }
    this.categoryService.deleteCategory(categoryId);
  }

  getCategoryById(categoryId: string) {
    return this.categories().find((c) => c.id === categoryId);
  }

  private getTaskCountByCategory(categoryId: string): number {
    return this.tasks().filter((t) => t.categoryId === categoryId).length;
  }

  private buildTaskSubtitle(count: number, suffix: string): string {
    const plural = count !== 1 ? 's' : '';
    return `${count} task${plural} ${suffix}`;
  }

  private buildDeleteCategoryMessage(categoryName: string, taskCount: number): string {
    const baseMessage = `Are you sure you want to delete "${categoryName}"?`;
    if (taskCount === 0) return baseMessage;

    const plural = taskCount !== 1 ? 's' : '';
    return `${baseMessage} This will also delete ${taskCount} task${plural}.`;
  }
}
