import { computed, inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Category } from '../../../core/models/category.model';
import { StorageService } from '../../../core/storage/storage';

const CATEGORIES_KEY = 'categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly storage: StorageService = inject(StorageService);

  readonly categories = signal<Category[]>([]);
  readonly categoryCount = computed(() => this.categories().length);

  private readonly defaultCategories: Category[] = [
    { id: 'planning', name: 'Planificación', color: '#004884' },
    { id: 'execution', name: 'Ejecución', color: '#0072C6' },
    { id: 'reporting', name: 'Reportes', color: '#00A3E0' },
    { id: 'meetings', name: 'Reuniones', color: '#007A33' },
  ];

  constructor() {
    this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    const storedCategories = await this.storage.get<Category[]>(CATEGORIES_KEY);

    if (storedCategories?.length) {
      this.categories.set(storedCategories);
    } else {
      this.categories.set(this.defaultCategories);
      await this.storage.set(CATEGORIES_KEY, this.defaultCategories);
    }
  }

  async addCategory(name: string, color?: string): Promise<void> {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newCategory: Category = {
      id: uuidv4(),
      name: trimmedName,
      color,
    };

    await this.updateState([...this.categories(), newCategory]);
  }

  async updateCategory(categoryId: string, name: string, color?: string): Promise<void> {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const updatedCategories = this.categories().map((category) =>
      category.id === categoryId ? { ...category, name: trimmedName, color } : category
    );

    await this.updateState(updatedCategories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const updatedCategories = this.categories().filter((category) => category.id !== categoryId);
    await this.updateState(updatedCategories);
  }

  getCategoryById(categoryId: string): Category | undefined {
    return this.categories().find((category) => category.id === categoryId);
  }

  private async updateState(categories: Category[]): Promise<void> {
    this.categories.set(categories);
    await this.storage.set(CATEGORIES_KEY, categories);
  }
}
