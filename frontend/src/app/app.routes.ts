import {
  provideRouter,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Tasks } from './tasks/tasks';
import { tasksResolver } from './resolvers/tasks.resolver';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'tasks',
    component: Tasks,
    resolve: { tasks: tasksResolver },
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

provideRouter(routes, withComponentInputBinding());
