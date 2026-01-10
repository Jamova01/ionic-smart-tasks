import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, IonicModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Input() categoryName?: string;
  @Input() categoryColor?: string;
  @Input() variant: 'pending' | 'completed' = 'pending';

  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
