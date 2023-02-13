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
      animate('1s', style({ opacity: 1 })),
      query('@popupChild', [animateChild()]),
    ]),
    transition(':leave', [
      animate('1s', style({ opacity: 0 })),
      // query('@popupChild', [animateChild()]),
    ]),
  ]),
  trigger('popupChild', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(160px)' }),
      animate('1s', style({ opacity: 1, transform: 'translateX(1px)' })),
    ]),
    // transition(':leave', [
    //   animate('1s', style({ opacity: 0, transform: 'translateY(50px)' })),
    // ]),
  ]),
];
