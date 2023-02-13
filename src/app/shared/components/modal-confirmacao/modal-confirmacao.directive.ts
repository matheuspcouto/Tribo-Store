import { Directive, EventEmitter, HostListener, Inject, InjectionToken, Input, Output } from '@angular/core';

export interface ModalConfirmacaoConfig { title: string, message: string }
export type ModalConfirmacao = (config: ModalConfirmacaoConfig) => Promise<boolean>;

export const MODAL_CONFIRMACAO = new InjectionToken<ModalConfirmacao>('ModalConfirmacaoConfig');

@Directive({ selector: '[appModalConfirmacao]', exportAs: 'modalConfirmacao' })
export class ModalConfirmacaoDirective {

  @Input('appModalConfirmacao')
  config?: ModalConfirmacaoConfig;

  @Output()
  then = new EventEmitter();

  @Output()
  else = new EventEmitter();

  constructor(@Inject(MODAL_CONFIRMACAO) private confirm: ModalConfirmacao) { }

  @HostListener('click', ['$event'])
  async click(event: MouseEvent) {
    event.stopPropagation();

    if (this.config) {
      const result = await this.confirm(this.config);

      if (result) { this.then.next(); }
      else { this.else.next(); }
    }
  }

}
