import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HighlightOnHover {
  readonly highlightColor = input('#eef2ff', { alias: 'appHighlightOnHover' });
  readonly highlightScale = input(1);

  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private renderer = inject(Renderer2);

  onMouseEnter(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'background', this.highlightColor());
    this.renderer.setStyle(el, 'transform', `scale(${this.highlightScale()})`);
    this.renderer.setStyle(el, 'transition', 'background 0.15s ease, transform 0.15s ease');
  }

  onMouseLeave(): void {
    const el = this.el.nativeElement;
    this.renderer.removeStyle(el, 'background');
    this.renderer.removeStyle(el, 'transform');
    this.renderer.removeStyle(el, 'transition');
  }
}