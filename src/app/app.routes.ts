import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [authGuard]   
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
