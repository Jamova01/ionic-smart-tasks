import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonChip,
  IonLabel,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  addOutline,
  arrowForward,
  briefcaseOutline,
  checkmarkCircleOutline,
  checkmarkDoneOutline,
  clipboardOutline,
  closeOutline,
  createOutline,
  funnelOutline,
  hourglassOutline,
  listOutline,
  pricetagOutline,
  timeOutline,
  trashOutline,
  colorPaletteOutline,
  eyeOutline,
  chevronDownOutline,
  chevronUpOutline,
} from 'ionicons/icons';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonCheckbox,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
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

  readonly showCategoryForm = signal(false);

  readonly categoryNameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });

  readonly categoryColorControl = new FormControl('#004884', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly predefinedColors = [
    '#004884',
    '#fdda24',
    '#00315c',
    '#10b981',
    '#ef4444',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#6366f1',
  ];

  readonly filteredTasks = computed(() => {
    const allTasks = this.tasks();
    const categoryFilter = this.selectedCategoryFilter();

    if (!categoryFilter) {
      return allTasks;
    }

    return allTasks.filter((task) => task.categoryId === categoryFilter);
  });

  readonly completedTasks = computed(() => this.filteredTasks().filter((task) => task.completed));

  readonly pendingTasks = computed(() => this.filteredTasks().filter((task) => !task.completed));

  readonly completedCount = computed(() => this.completedTasks().length);
  readonly pendingCount = computed(() => this.pendingTasks().length);

  readonly taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  readonly categoryControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnInit(): void {
    this.initializeIcons();
  }

  submit(): void {
    if (this.taskControl.invalid) {
      this.taskControl.markAsTouched();
      return;
    }

    const taskTitle = this.taskControl.value.trim();
    let categoryId = this.categoryControl.value;

    if (!categoryId) {
      const defaultCategory = this.categories()[0];
      categoryId = defaultCategory.id;
      this.categoryControl.setValue(categoryId);
    }

    this.taskService.addTask(taskTitle, categoryId);
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

  getCategoryById(categoryId: string) {
    return this.categories().find((cat) => cat.id === categoryId);
  }

  getTaskCountByCategory(categoryId: string): number {
    return this.tasks().filter((task) => task.categoryId === categoryId).length;
  }

  toggleCategoryForm(): void {
    this.showCategoryForm.update((value) => !value);
    if (!this.showCategoryForm()) {
      this.resetCategoryForm();
    }
  }

  createCategory(): void {
    if (this.categoryNameControl.invalid) {
      this.categoryNameControl.markAsTouched();
      return;
    }

    const name = this.categoryNameControl.value.trim();
    const color = this.categoryColorControl.value;

    this.categoryService.addCategory(name, color);
    this.resetCategoryForm();
    this.showCategoryForm.set(false);
  }

  async confirmDeleteCategory(categoryId: string): Promise<void> {
    const category = this.getCategoryById(categoryId);
    const tasksInCategory = this.getTaskCountByCategory(categoryId);

    const alert = await this.alertController.create({
      header: 'Delete Category',
      message:
        tasksInCategory > 0
          ? `Are you sure you want to delete "${
              category?.name
            }"? This will also delete ${tasksInCategory} task${tasksInCategory !== 1 ? 's' : ''}.`
          : `Are you sure you want to delete "${category?.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteCategory(categoryId);
          },
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

  selectColor(color: string): void {
    this.categoryColorControl.setValue(color);
  }

  trackById(_: number, task: Task): string {
    return task.id;
  }

  trackByCategoryId(_: number, category: { id: string }): string {
    return category.id;
  }

  private resetTaskControl(): void {
    this.taskControl.reset('');
  }

  private resetCategoryForm(): void {
    this.categoryNameControl.reset('');
    this.categoryColorControl.reset('#004884');
  }

  private initializeIcons(): void {
    addIcons({
      'add-circle-outline': addCircleOutline,
      'add-outline': addOutline,
      'arrow-forward': arrowForward,
      'briefcase-outline': briefcaseOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'checkmark-outline': checkmarkCircleOutline,
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
