import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ActionState } from './models';

const CHOSEN = trigger('chosenTrigger', [
  state(
    ActionState.Chosen,
    style({
      opacity: 1,
      transform: 'translateY(250px)',
    }),
  ),
  state(
    ActionState.NotChosen,
    style({
      opacity: 0.3,
    }),
  ),
  state(
    ActionState.Default,
    style({
      opacity: '*',
      transform: 'translateY(0)',
    }),
  ),
  transition(`${ActionState.Chosen} <=> ${ActionState.Default}`, [animate('0.5s')]),
  transition(`${ActionState.NotChosen} <=> ${ActionState.Default}`, [animate('0.5s')]),
]);

const ENEMY = trigger('enemyTrigger', [
  transition(':enter', [
    style({
      transform: 'translateX(50vw)',
      opacity: 0,
    }),
    animate(
      '0.5s',
      keyframes([
        style({ transform: 'translateX(150px)', opacity: 1, offset: 0.8 }),
        style({ transform: 'translateX(180px)', opacity: 1, offset: 1 }),
      ]),
    ),
  ]),
  transition(':leave', [animate('0.5s', style({ transform: 'translateX(50vw)', opacity: 0 }))]),
]);

export const ACTION_ANIMATION = [CHOSEN, ENEMY];
