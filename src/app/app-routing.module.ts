import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {TermComponent} from './term/term.component';
import {ProductListComponent} from './product-list/product-list.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrdersComponent } from './orders/orders.component';
import { QueriesComponent } from './query/queries/queries.component';
import { QueryResponseComponent } from './query/query-response/query-response.component';
import { QueryComposeComponent } from './query/query-compose/query-compose.component';
import { ProductTypeComponent } from './products/product-type/product-type.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductTestComponent } from './products/product-test/product-test.component';

const routes: Routes = [
    {
        path: '', pathMatch:"full",component:WelcomeComponent
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'product-list',
                component: ProductListComponent,
            },
            {
                path: 'product-type/:id', 
                component: ProductTypeComponent,
            },
            {
                path: 'product-details', 
                component: ProductDetailsComponent,
            },
            {
                path: 'orders',
                component: OrdersComponent,
            },
            {
                path: 'queries',
                component: QueriesComponent,
            },
            {
                path: 'query-response', 
                component: QueryResponseComponent,
            },
            {
                path: 'query-compose',
                component: QueryComposeComponent,
            },
        ]
    },
    {
        path: 'product-test', 
        component: ProductTestComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'terms',
        component: TermComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
