import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { RPC_Action } from '@app/models/constants';

@Directive({
  selector: '[appRpcAction]',
})
export class RpcActionDirective implements OnInit {
  @Input() appRpcAction: RPC_Action;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'playground__act');
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, this.appRpcAction);
  }
}
