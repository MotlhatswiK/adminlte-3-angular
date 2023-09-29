import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductdisplayService } from '@services/productdisplay.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  products: any = [];
  cartdata: any = [];
  public id: any[] = [];
  public test: string = '';
  carts = [];
  total: number = 0;
  selectedProducts: any[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, private productDisplay: ProductdisplayService) {}
  
  /* ngOnInit(): void {
    this.test = this.route.snapshot.paramMap.get('id');
    const productUrl = 'http://10.2.2.90:9023/ekutrade/rest/product/{' + this.test + '}';
    const cartUrl = 'http://10.2.2.90:9023/ekutrade/rest/shoppingcart/{thato.sefatsa@xetgroup.com}';
  
    // Combine multiple HTTP requests using forkJoin
    /* forkJoin([
      this.http.get(productUrl, { responseType: 'json' }),
      this.http.get(cartUrl, { responseType: 'json' })
    ]).subscribe(([productResponse, cartResponse]) => {
      // Handle productResponse and cartResponse here
      this.products = productResponse; // array
      this.cartdata = cartResponse;
      console.log(this.products);
      console.log(this.cartdata);
      console.log(this.test);
      // Calculate the total after both requests are completed
      console.log(this.calculateTotal());
    }); 
  } */

  ngOnInit(): void {
    this.products = null;
    this.test = this.route.snapshot.paramMap.get('id');
    const url = 'http://10.2.2.90:9023/ekutrade/rest/product/{' + this.test + '}';
  
    this.http.get(url, {responseType:'json'}).subscribe((response) => {
    // Handle the response here
    this.products = response;//array
    //console.log(this.products);
    });

    const urlresponse = 'http://10.2.2.90:9023/ekutrade/rest/shoppingcart/{john.doe@example.com}';
    this.http.get(urlresponse, {responseType:'json'}).subscribe((response) => {
    this.cartdata = response;
    console.log(this.cartdata);
    });

    this.calculateTotal();
  }
  

    addToCart(product:any){
        const total = (product.price * product.selectQuantity).toFixed(2);
        const cartItem = {
          description: product.description,
          price: parseFloat(total),
          shoppingcartId: "1001",
          quantity: product.selectQuantity || 1,
        };

      //this.carts.push(cartItem);
      //console.log(cartItem);

      const apiUrl = 'http://10.2.2.90:9023/ekutrade/rest/shoppingcart/addproduct'; // Replace with your API endpoint
      this.http.post(apiUrl, cartItem, {responseType: 'text'}).subscribe(
        (response: any) => {
          // Handle success, e.g., display a success message
          console.log('Item added to the cart:', response);

          // Optionally, you can update the cart items or perform other actions based on the API response
          // Example: this.carts.push(response);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error adding item to the cart:', error);
        }
      );

      const urlresponse = 'http://10.2.2.90:9023/ekutrade/rest/shoppingcart/{john.doe@example.com}';
      this.http.get(urlresponse, {responseType:'json'}).subscribe((response) => {
      this.cartdata = response;
      console.log(this.cartdata)});

    }

    calculateTotal() {
      return this.total = this.total + Number(this.products.price);
    }

    removeFromCart(cartItem: any){
      const index = this.carts.indexOf(cartItem);

      if(index !== -1){
        const removeItem = this.carts.splice(index,1)[0];
        this.total -= removeItem.price * removeItem.quantity;
      }
    }
}
