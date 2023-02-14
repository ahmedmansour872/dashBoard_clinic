import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const move = [
  trigger('translate', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(150px)' }),
      animate('.5s', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateX(0)' }),
      animate('.5s', style({ opacity: 0, transform: 'translateX(150px)' })),
    ]),
  ]),
];
