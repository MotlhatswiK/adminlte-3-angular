import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '@/categories.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories: any[] = [];
  constructor(private http: HttpClient, private productsService: CategoriesService) {}
    ngOnInit(): void {
      this.loadCategories();
      
    }

  loadCategories() {
    this.productsService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories)
    });
  }
}
