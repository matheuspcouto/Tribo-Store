import { ComponentAtivoService } from './shared/components/modal-confirmacao/component-ativo.service';
import { ModalConfirmacaoService } from './shared/components/modal-confirmacao/modal-confirmacao.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public modalConfirmacaoService: ModalConfirmacaoService,
    public componenteAtivoService: ComponentAtivoService
  ) {}
}
