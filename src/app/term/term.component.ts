import {  Component, 
  OnInit, 
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
  ) {}

  ngOnInit() {
    this.renderer.addClass(
        document.querySelector('app-root'),
        'login-page'
    ); 
  }  
}
