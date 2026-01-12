import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-stats-summary',
  imports: [CommonModule, IonicModule],
  templateUrl: './stats-summary.component.html',
  styleUrls: ['./stats-summary.component.scss'],
})
export class StatsSummaryComponent {
  total = input.required<number>();
  pending = input.required<number>();
  completed = input.required<number>();
}
