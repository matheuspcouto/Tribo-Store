import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

import { AguardeComponent } from './modules/aguarde/aguarde.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { SucessoComprovanteComponent } from './modules/sucesso-comprovante/sucesso-comprovante.component';
import { LoadderComponent } from './shared/components/loadder/loadder.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { DetalhesProdutoComponent } from './modules/produtos/detalhes-produto/detalhes-produto.component';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './modules/carrinho/carrinho.component';
import { FinalizarPedidoComponent } from './modules/finalizar-pedido/finalizar-pedido.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PagamentoComponent } from './modules/pagamento/pagamento.component';
import { ModalConfirmacaoDirective } from './shared/directives/modal-confirmacao.directive';
import { ModalConfirmacaoComponent } from './shared/components/modal-confirmacao/modal-confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrinhoComponent,
    AguardeComponent,
    FooterComponent,
    SucessoComprovanteComponent,
    LoadderComponent,
    ProdutosComponent,
    DetalhesProdutoComponent,
    FinalizarPedidoComponent,
    PagamentoComponent,
    ModalConfirmacaoDirective,
    ModalConfirmacaoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [SiteAtivoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
