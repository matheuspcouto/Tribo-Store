import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

import { AguardeComponent } from './modules/aguarde/aguarde.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { SucessoComprovanteComponent } from './modules/sucesso-comprovante/sucesso-comprovante.component';
import { LoadderComponent } from './shared/loadder/loadder.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { DetalhesProdutoComponent } from './modules/produtos/detalhes-produto/detalhes-produto.component';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './modules/carrinho/carrinho.component';

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [SiteAtivoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
