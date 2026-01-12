import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, IonicModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  task = input.required<Task>();
  categoryName = input<string>();
  categoryColor = input<string>();
  variant = input<'pending' | 'completed'>('pending');

  toogle = output<string>();
  delete = output<string>();

  onToggle() {
    this.toogle.emit(this.task().id);
  }

  onDelete() {
    this.delete.emit(this.task().id);
  }
}
