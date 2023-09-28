import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '@services/categories.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categories: any[] = [];
  searchText: string = '';
  filteredCategories: any[] = [];

  constructor(private http: HttpClient, private productsService: CategoriesService) {}
  ngOnInit(): void {
    this.productsService.getCategories().subscribe((data) => {
      this.categories = this.processCategories(data);
      this.filteredCategories = [...this.categories];
    });
  }

  private processCategories(data: any[]): any[] {
    return data.map((category) => ({
      ...category,
      imageUrl: `../../assets/images/${category.description}.png`,
    }));
  }

  searchCategories(): void {
    this.filteredCategories = this.categories.filter((category) =>
      category.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  /* searchCategories(): void {
    this.filterCategories();
  } */

  /* onSelect(categoryId){

  } */

  /* loadCategories() {
    this.productsService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories)
    });
  } */
}
