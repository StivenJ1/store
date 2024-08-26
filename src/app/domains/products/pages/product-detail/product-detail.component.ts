import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  @Input() id?: string;

  product = signal<Product | null>(null);
  cover = signal('');
  private productSrv = inject(ProductService);
  private cartSrv = inject(CartService);

  ngOnInit() {
    if (this.id) {
      this.productSrv.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0])
          }
        }
      })
    }

  }

  changeCover(img: string) {
    this.cover.set(img);
  }

  addToCart() {
    const product = this.product();
    if(product){
      this.cartSrv.addToCart(product);
    }
    
  }

}
