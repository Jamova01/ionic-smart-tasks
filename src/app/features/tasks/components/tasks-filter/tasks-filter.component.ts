import { Component, computed, input, output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-tasks-filter',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
})
export class TasksFilterComponent {
  categories = input<Category[]>([]);
  activeCategoryId = input<string | null>(null);

  filter = output<string | null>();

  readonly hasActiveFilter = computed(() => !!this.activeCategoryId());

  isFilterActive(categoryId: string): boolean {
    return this.activeCategoryId() === categoryId;
  }

  filterByCategory(categoryId: string): void {
    if (this.activeCategoryId() === categoryId) return;
    this.filter.emit(categoryId);
  }

  clearFilter(): void {
    if (!this.activeCategoryId()) return;
    this.filter.emit(null);
  }
}
