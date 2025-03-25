import {Component, inject} from '@angular/core';
import {StageService} from '../../services/stage.service';
import {StageDetailsModel} from '../../models/stage-details-model';

@Component({
  selector: 'app-stage-all',
  imports: [],
  templateUrl: './stage-all.component.html',
  styleUrl: './stage-all.component.scss'
})
export class StageAllComponent {

  private readonly _stageService: StageService=inject(StageService);

  stages : StageDetailsModel[] = [];
  constructor(){
    this._stageService.getAllStage().subscribe({
      next: (stages:StageDetailsModel[])=> {
        this.stages = stages;
        console.log(stages)
      },
      error: (error :String) => console.log(error)
      }
    )
  }
}
