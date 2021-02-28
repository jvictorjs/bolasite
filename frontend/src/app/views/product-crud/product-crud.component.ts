import { slideInAnimation } from './../../route-animation';
import { NavService } from './../../components/template/nav/nav.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css'],
  animations: [slideInAnimation]
})
export class ProductCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: NavService) {
    headerService.headerData = {
      title: 'Produtos (crud)',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create'])
  }
}
