import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-home',
        path: ['/dashboard']
    },
    {
        name: 'Sale Management',
        iconClasses: 'fas fa-chart-area',        
        children: [
            {
                name: 'Orders',
                iconClasses: 'far fa-circle',
                path: ['/orders']
            }
        ]
    },
    {
        name: 'Product List',
        iconClasses: 'fas fa-seedling',        
        children: [
            {
                name: 'Products',
                iconClasses: 'far fa-circle',
                path: ['/product-list']
            }
        ]
    },
    {
        name: 'Analytics',
        iconClasses: 'fas fa-chart-pie',
    },
    {
        name: 'Reports',
        iconClasses: 'fas fa-file-export',
    },
    /* {
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    } */
    {
        name: 'Queries',
        iconClasses: 'fas fa-envelope',        
        children: [
            {
                name: 'View Queries',
                iconClasses: 'far fa-circle',
                path: ['/queries']
            },
            {
                name: 'Send Query',
                iconClasses: 'far fa-circle',
                path: ['/query-compose']
            } 
        ]
    }
    /* {
        name: 'Logout',
        iconClasses: 'fas fa-sign-out-alt',
    } */
];
