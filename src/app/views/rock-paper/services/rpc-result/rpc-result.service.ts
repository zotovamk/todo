import { Injectable } from '@angular/core';
import { RPC_Action } from '@app/models/constants';
import { Result, IChosen } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class RpcResultService {
  constructor() {}

  getResultByChosen(chosen: IChosen): Result {
    if (chosen.user === chosen.enemy) {
      return Result.Draw;
    }

    switch (chosen.user) {
      case RPC_Action.Paper:
        return chosen.enemy === RPC_Action.Rock ? Result.Win : Result.Lose;
        break;

      case RPC_Action.Rock:
        return chosen.enemy === RPC_Action.Scissors ? Result.Win : Result.Lose;
        break;

      default:
        return chosen.enemy === RPC_Action.Paper ? Result.Win : Result.Lose;
        break;
    }
  }
}
