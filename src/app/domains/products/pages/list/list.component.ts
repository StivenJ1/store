import { Component, inject, Input, OnInit, signal, SimpleChanges } from '@angular/core';
import { Category, Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '@products/components/product/product.component';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent implements OnInit {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartSrv = inject(CartService);
  private productSrv = inject(ProductService);
  private categorySrv = inject(CategoryService);
  @Input() category_id? : string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();      
  }

  addToCart(product: Product) {
    this.cartSrv.addToCart(product)
  }

  private getProducts() {
    this.productSrv.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    })
  }

  private getCategories() {
    this.categorySrv.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: () => {

      }
    })
  }

}
