import { Component, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tasks-header',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss'],
})
export class TasksHeaderComponent {
  readonly title = input<string>('Task Manager');
  readonly subtitle = input<string>('Organize your day efficiently');
  readonly icon = input<string>('briefcase-outline');
}
