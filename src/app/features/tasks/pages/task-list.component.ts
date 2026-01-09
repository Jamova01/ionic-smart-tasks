import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../services/task.service';
import { Task } from '../../../core/models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  readonly tasks = this.taskService.tasks;
  readonly completedTasks = this.taskService.completedTasks;
  readonly pendingTasks = this.taskService.pendingTasks;
  readonly completedCount = this.taskService.completedCount;
  readonly pendingCount = this.taskService.pendingCount;

  readonly taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  submit(): void {
    if (this.taskControl.invalid) {
      this.taskControl.markAsTouched();
      return;
    }

    this.taskService.addTask(this.taskControl.value.trim());
    this.taskControl.reset('');
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

  trackById(_: number, task: Task): string {
    return task.id;
  }
}
