import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-quick-add-task',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './quick-add-task.component.html',
  styleUrls: ['./quick-add-task.component.scss'],
})
export class QuickAddTaskComponent {
  // Inputs
  categories = input<Category[]>([]);

  // Outputs
  create = output<{ title: string; categoryId: string }>();

  // Form controls
  readonly taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  readonly categoryControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  submit(): void {
    if (this.taskControl.invalid) {
      this.taskControl.markAsTouched();
      return;
    }

    const title = this.taskControl.value.trim();
    if (!title) return;

    let categoryId = this.categoryControl.value;

    // Fallback: primera categoría disponible
    if (!categoryId && this.categories().length > 0) {
      categoryId = this.categories()[0].id;
      this.categoryControl.setValue(categoryId);
    }

    if (!categoryId) return;

    this.create.emit({ title, categoryId });
    this.resetForm();
  }

  private resetForm(): void {
    this.taskControl.reset('');
    this.categoryControl.reset('');
  }
}
