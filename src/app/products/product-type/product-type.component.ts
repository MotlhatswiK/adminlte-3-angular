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
  carts = [];
  total: number = 0;
  selectedProducts: any[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private productDisplay: ProductdisplayService) {}
  
    ngOnInit(): void {
      
      this.test = this.route.snapshot.paramMap.get('id');
      const url = `http://10.2.2.90:9023/ekutrade/rest/product/${this.test}`;
    
      this.http.get(url, {responseType:'json'}).subscribe((response) => {
      // Handle the response here
      this.products = response;//array
      //console.log(this.products);
      });

      this.calculateTotal();
    }

    addToCart(product:any){
        const total = (product.price * product.selectQuantity).toFixed(2);
        const cartItem = {
          description: product.description,
          price: parseFloat(total),
          quantity: product.selectQuantity || 1,
      };

      this.carts.push(cartItem);
    }

    calculateTotal() {
      return this.total = this.carts.reduce((sum, cartItem) => sum + cartItem.price, 0);
    }

    removeFromCart(cartItem: any){
      const index = this.carts.indexOf(cartItem);

      if(index !== -1){
        const removeItem = this.carts.splice(index,1)[0];
        this.total -= removeItem.price * removeItem.quantity;
      }
    }
}
