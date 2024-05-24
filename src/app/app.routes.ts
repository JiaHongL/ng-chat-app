import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ResetComponent } from './pages/reset/reset.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path:'reset',
        component: ResetComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
