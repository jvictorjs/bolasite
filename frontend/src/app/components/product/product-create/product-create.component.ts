import { slideInAnimation } from './../../../route-animation';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  animations: [slideInAnimation]
})
export class ProductCreateComponent implements OnInit {

  product: Product = { // nao precisa validar o tipo, opcional (quando for mostrar jogo, nao declarar o tipo JOGO)
    name: '',
    price: 0
  }

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto Criado')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
