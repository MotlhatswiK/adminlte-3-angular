import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductdisplayService } from '@services/productdisplay.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  products: any = [];
  public id: any[] = [];
  public test: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private productDisplay: ProductdisplayService) {}
  
    ngOnInit(): void {
      
      //this.productDisplay.getProductDisplay(this.test).subscribe((data) => {
      //this.products = data;
      //console.log(this.test);
      //console.log(this.products);
    //});
    this.test = this.route.snapshot.paramMap.get('id');
    const url = `http://10.2.2.90:9023/ekutrade/rest/product/${this.test}`;
    
    this.http.get(url).subscribe((response) => {
      // Handle the response here
      this.products = response;
      console.log(this.products);
    });
    //console.log(this.test);
  }
}
