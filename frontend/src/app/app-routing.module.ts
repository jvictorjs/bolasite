import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { FutebolComponent } from './views/futebol/futebol.component';
import { FutebolEventReadComponent } from './components/futebol/futebol-event-read/futebol-event-read.component';
import { AboutComponent } from './views/about/about.component';
import { TvGuideComponent } from './views/tv-guide/tv-guide.component';
import { FutebolUpcomingComponent } from './components/futebol/futebol-upcoming/futebol-upcoming.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {animation: 'Home'}
  },
  {
    path: "products",
    component: ProductCrudComponent,
    data: {animation: 'Products'}
  },
  {
    path: "products/create",
    component: ProductCreateComponent,
    data: {animation: 'Products-create'}
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent,
    data: {animation: 'Products-update'}
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent,
    data: {animation: 'Products-delete'}
  },
  {
    path: "futebol",
    component: FutebolComponent,
    data: {animation: 'Futebol'}
  },
  {
    path: "futebol-upcoming",
    component: FutebolUpcomingComponent,
    data: {animation: 'Futebol-upcoming'}
  },
  {
    path: "futebol/event/:id",
    component: FutebolEventReadComponent,
    data: {animation: 'Futebol-event'}
  },
  {
    path: "about",
    component: AboutComponent,
    data: {animation: 'About'}
  },
  {
    path: "tv-guide",
    component: TvGuideComponent,
    data: {animation: 'TV-guide'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
