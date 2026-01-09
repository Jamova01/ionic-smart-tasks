import { v4 as uuidv4 } from 'uuid';
import { computed, Injectable, signal } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { StorageService } from '../../../core/storage/storage';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly tasks = signal<Task[]>([]);

  readonly completedTasks = computed(() => this.tasks().filter((t) => t.completed));
  readonly pendingTasks = computed(() => this.tasks().filter((t) => !t.completed));
  readonly completedCount = computed(() => this.completedTasks().length);
  readonly pendingCount = computed(() => this.pendingTasks().length);

  constructor(private storage: StorageService) {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    const storedTasks = await this.storage.get<Task[]>(TASKS_KEY);
    this.tasks.set(storedTasks ?? []);
  }

  async addTask(title: string): Promise<void> {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTask: Task = {
      id: uuidv4(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };

    const updatedTasks = [...this.tasks(), newTask];
    await this.updateState(updatedTasks);
  }

  async toggleTask(taskId: string): Promise<void> {
    const updatedTasks = this.tasks().map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    await this.updateState(updatedTasks);
  }

  async deleteTask(taskId: string): Promise<void> {
    const updatedTasks = this.tasks().filter((task) => task.id !== taskId);
    await this.updateState(updatedTasks);
  }

  async clearCompleted(): Promise<void> {
    const remainingTasks = this.tasks().filter((task) => !task.completed);
    await this.updateState(remainingTasks);
  }

  private async updateState(tasks: Task[]): Promise<void> {
    this.tasks.set(tasks);
    await this.storage.set(TASKS_KEY, tasks);
  }
}
