import { FinalizarPedidoComponent } from './modules/finalizar-pedido/finalizar-pedido.component';
import { CarrinhoComponent } from './modules/carrinho/carrinho.component';
import { DetalhesProdutoComponent } from './modules/produtos/detalhes-produto/detalhes-produto.component';
import { SucessoComprovanteComponent } from './modules/sucesso-comprovante/sucesso-comprovante.component';
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { SiteAtivoGuard } from './guards/site-ativo.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AguardeComponent } from './modules/aguarde/aguarde.component';
import { HomeComponent } from './modules/home/home.component';
import { ErroComponent } from './shared/components/erro/erro.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'erro', component: ErroComponent, canActivate:[SiteAtivoGuard] },
  { path: 'home', component: HomeComponent, canActivate: [SiteAtivoGuard] },
  { path: 'produtos', component: ProdutosComponent, canActivate:[SiteAtivoGuard] },
  { path: 'detalhes-produto', component: DetalhesProdutoComponent, canActivate:[SiteAtivoGuard] },
  { path: 'meu-carrinho', component: CarrinhoComponent, canActivate:[SiteAtivoGuard] },
  { path: 'finalizar-pedido', component: FinalizarPedidoComponent, canActivate:[SiteAtivoGuard] },
  { path: 'comprovante', component: SucessoComprovanteComponent },
  { path: 'aguarde', component: AguardeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
