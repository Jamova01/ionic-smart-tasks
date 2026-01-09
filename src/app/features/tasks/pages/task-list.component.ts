import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  createOutline,
  arrowForward,
  clipboardOutline,
  timeOutline,
  checkmarkDoneOutline,
  trashOutline,
} from 'ionicons/icons';

import { TaskService } from '../services/task.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
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

  ngOnInit(): void {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    addIcons({
      'briefcase-outline': briefcaseOutline,
      'create-outline': createOutline,
      'arrow-forward': arrowForward,
      'clipboard-outline': clipboardOutline,
      'time-outline': timeOutline,
      'checkmark-done-outline': checkmarkDoneOutline,
      'trash-outline': trashOutline,
    });
  }

  submit(): void {
    if (this.taskControl.invalid) {
      this.taskControl.markAsTouched();
      return;
    }

    const taskTitle = this.taskControl.value.trim();
    this.taskService.addTask(taskTitle);
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

  trackById(_: number, task: Task): string {
    return task.id;
  }

  private resetTaskControl(): void {
    this.taskControl.reset('');
  }
}
