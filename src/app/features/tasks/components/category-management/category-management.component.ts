import { Component, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../../../core/models/task.model';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent {
  categories = input<Category[]>([]);
  tasks = input<Task[]>([]);
  activeCategoryId = input<string | null>(null);

  create = output<{ name: string; color: string }>();
  filter = output<string>();
  delete = output<string>();

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
  ] as const;

  readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });

  readonly colorControl = new FormControl('#004884', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly showForm = signal(false);

  toggleForm(): void {
    this.showForm.update((v) => !v);
  }

  selectColor(color: string): void {
    this.colorControl.setValue(color);
    this.colorControl.markAsDirty();
  }

  submit(): void {
    if (this.nameControl.invalid) return;

    this.create.emit({
      name: this.nameControl.value.trim(),
      color: this.colorControl.value,
    });

    this.nameControl.reset('');
    this.colorControl.reset('#004884');
    this.showForm.set(false);
  }

  taskCount(categoryId: string): number {
    return this.tasks().filter((t) => t.categoryId === categoryId).length;
  }

  isActive(categoryId: string): boolean {
    return this.activeCategoryId() === categoryId;
  }
}
