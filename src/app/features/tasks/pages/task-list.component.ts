import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  AlertController,
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  addOutline,
  arrowForward,
  briefcaseOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  chevronDownOutline,
  chevronUpOutline,
  clipboardOutline,
  closeOutline,
  colorPaletteOutline,
  createOutline,
  eyeOutline,
  funnelOutline,
  hourglassOutline,
  listOutline,
  pricetagOutline,
  timeOutline,
  trashOutline,
} from 'ionicons/icons';

import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';

import { Task } from '../../../core/models/task.model';

import { TaskItemComponent } from '../components/task-item/task-item.component';
import { StatsSummaryComponent } from '../components/stats-summary/stats-summary.component';
import { TasksHeaderComponent } from '../components/tasks-header/tasks-header.component';
import { CategoryManagementComponent } from '../components/category-management/category-management.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TaskItemComponent,
    StatsSummaryComponent,
    TasksHeaderComponent,
    CategoryManagementComponent,

    IonButton,
    IonChip,
    IonContent,
    IonIcon,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly categoryService = inject(CategoryService);
  private readonly alertController = inject(AlertController);

  readonly tasks = this.taskService.tasks;
  readonly categories = this.categoryService.categories;

  readonly selectedCategoryFilter = signal<string | null>(null);

  readonly taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  readonly categoryControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly filteredTasks = computed(() => {
    const filter = this.selectedCategoryFilter();
    return filter ? this.tasks().filter((t) => t.categoryId === filter) : this.tasks();
  });

  readonly completedTasks = computed(() => this.filteredTasks().filter((t) => t.completed));

  readonly pendingTasks = computed(() => this.filteredTasks().filter((t) => !t.completed));

  readonly completedCount = computed(() => this.completedTasks().length);
  readonly pendingCount = computed(() => this.pendingTasks().length);

  ngOnInit(): void {
    this.initializeIcons();
  }

  submit(): void {
    if (this.taskControl.invalid) {
      this.taskControl.markAsTouched();
      return;
    }

    const title = this.taskControl.value.trim();
    let categoryId = this.categoryControl.value;

    if (!categoryId) {
      categoryId = this.categories()[0]?.id;
      this.categoryControl.setValue(categoryId);
    }

    this.taskService.addTask(title, categoryId);
    this.resetTaskControl();
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

  filterByCategory(categoryId: string): void {
    this.selectedCategoryFilter.set(categoryId);
  }

  clearFilter(): void {
    this.selectedCategoryFilter.set(null);
  }

  isFilterActive(categoryId: string): boolean {
    return this.selectedCategoryFilter() === categoryId;
  }

  createCategory(data: { name: string; color: string }): void {
    this.categoryService.addCategory(data.name, data.color);
  }

  async confirmDeleteCategory(categoryId: string): Promise<void> {
    const category = this.getCategoryById(categoryId);
    const count = this.getTaskCountByCategory(categoryId);

    const alert = await this.alertController.create({
      header: 'Delete Category',
      message:
        count > 0
          ? `Are you sure you want to delete "${
              category?.name
            }"? This will also delete ${count} task${count !== 1 ? 's' : ''}.`
          : `Are you sure you want to delete "${category?.name}"?`,
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
      this.clearFilter();
    }
    this.categoryService.deleteCategory(categoryId);
  }

  trackById(_: number, task: Task): string {
    return task.id;
  }

  trackByCategoryId(_: number, category: { id: string }): string {
    return category.id;
  }

  getCategoryById(categoryId: string) {
    return this.categories().find((c) => c.id === categoryId);
  }

  private resetTaskControl(): void {
    this.taskControl.reset('');
  }

  private getTaskCountByCategory(categoryId: string): number {
    return this.tasks().filter((t) => t.categoryId === categoryId).length;
  }

  private initializeIcons(): void {
    addIcons({
      'add-circle-outline': addCircleOutline,
      'add-outline': addOutline,
      'arrow-forward': arrowForward,
      'briefcase-outline': briefcaseOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'chevron-down-outline': chevronDownOutline,
      'chevron-up-outline': chevronUpOutline,
      'clipboard-outline': clipboardOutline,
      'close-outline': closeOutline,
      'color-palette-outline': colorPaletteOutline,
      'create-outline': createOutline,
      'eye-outline': eyeOutline,
      'funnel-outline': funnelOutline,
      'hourglass-outline': hourglassOutline,
      'list-outline': listOutline,
      'pricetag-outline': pricetagOutline,
      'time-outline': timeOutline,
      'trash-outline': trashOutline,
    });
  }
}
