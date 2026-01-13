import { Component, input, output } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { Task } from '../../../../core/models/task.model';
import { Category } from '../../../../core/models/category.model';

import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-tasks-section',
  imports: [IonicModule, TaskItemComponent],
  templateUrl: './tasks-section.component.html',
  styleUrls: ['./tasks-section.component.scss'],
})
export class TasksSectionComponent {
  tasks = input<Task[]>([]);
  categories = input<Category[]>([]);

  variant = input<'pending' | 'completed'>('pending');

  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input.required<string>();

  showAction = input<boolean>(false);
  actionLabel = input<string>('');
  actionIcon = input<string>('');

  toggle = output<string>();
  remove = output<string>();
  action = output<void>();

  getCategoryName(categoryId: string): string | undefined {
    return this.categories().find((c) => c.id === categoryId)?.name;
  }

  getCategoryColor(categoryId: string): string | undefined {
    return this.categories().find((c) => c.id === categoryId)?.color;
  }
}
