import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

import { AguardeComponent } from './components/aguarde/aguarde.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SucessoComprovanteComponent } from './components/sucesso-comprovante/sucesso-comprovante.component';
import { LoadderComponent } from './components/loadder/loadder.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { ProdutosComponent } from './components/produtos/produtos.component';
import { DetalhesProdutoComponent } from './components/produtos/detalhes-produto/detalhes-produto.component';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PagamentoComponent } from './components/pagamento/pagamento.component';

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
