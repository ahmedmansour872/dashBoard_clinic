import {
  animate,
  animateChild,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const popup = [
  trigger('popupParent', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.5s', style({ opacity: 1 })),
      query('@popupChildRight', [animateChild()]),
      query('@popupChildLeft', [animateChild()]),
    ]),
    transition(':leave', [animate('.5s', style({ opacity: 0 }))]),
  ]),
  trigger('popupChildRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(100px)' }),
      animate('.5s', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
  ]),
  trigger('popupChildLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-100px)' }),
      animate('.5s', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
  ]),
];
