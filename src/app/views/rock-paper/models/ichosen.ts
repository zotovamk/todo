import { RPC_Action } from '@app/models/constants';

export interface IChosen {
  user: RPC_Action | null;
  enemy: RPC_Action | null;
}
