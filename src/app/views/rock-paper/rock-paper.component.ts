import { Component } from '@angular/core';

import { RPC_Action } from '@models/constants';
import { ACTION_ANIMATION } from './animation';
import { Result, ActionState, IChosen, RESULT_MSG } from './models';
import { RpcResultService } from './services';

@Component({
  selector: 'app-rock-paper',
  templateUrl: './rock-paper.component.html',
  styleUrls: ['./rock-paper.component.scss'],
  animations: ACTION_ANIMATION,
})
export class RockPaperComponent {
  ACTIONS: RPC_Action[] = [RPC_Action.Rock, RPC_Action.Paper, RPC_Action.Scissors];
  isGameOn = true;
  chosen: IChosen = { user: null, enemy: null };
  resultMsg: string;

  score = 0;

  constructor(private readonly resultService: RpcResultService) {}

  onActionClick(type: RPC_Action) {
    this.chosen = { user: type, enemy: this.randomAction };
    this.isGameOn = false;
    this.updateScore();
  }

  onTryAgainClick() {
    this.isGameOn = true;
    this.clearChosen();
  }

  onAnimationDone(event: any) {
    console.log(event);
  }

  getActionState(action: RPC_Action): ActionState {
    if (this.isGameOn) {
      return ActionState.Default;
    }

    return action === this.chosen.user ? ActionState.Chosen : ActionState.NotChosen;
  }

  private get randomAction(): RPC_Action {
    const ind = Math.floor(Math.random() * 3);
    return this.ACTIONS[ind];
  }

  private updateScore() {
    const result = this.resultService.getResultByChosen(this.chosen);
    this.resultMsg = RESULT_MSG[result];

    if (result === Result.Draw) {
      return;
    }
    result === Result.Lose ? this.score-- : this.score++;
  }

  private clearChosen() {
    this.chosen = { user: null, enemy: null };
  }
}
