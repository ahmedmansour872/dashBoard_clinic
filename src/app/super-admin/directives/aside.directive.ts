import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAside]',
})
export class AsideDirective {
  isHovered: boolean;

  constructor(private render: Renderer2, private ref: ElementRef) {
    this.isHovered = false;
  }

  @Output() isHover: EventEmitter<any> = new EventEmitter();

  @HostListener('mouseenter') onMouseEnter() {
    this.isHover.emit(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHover.emit(false);
  }
}
