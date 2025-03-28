import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {StageDetailsModel} from '../../models/stage-details-model';


@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent {
  @Input() stage: StageDetailsModel | null = null;  // Accepter `null` comme valeur
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
