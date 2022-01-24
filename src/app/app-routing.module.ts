import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateEmpleadoComponent } from './create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
const routes: Routes = [
  {
    path: 'panelDeControl', loadChildren: () => import('./pages/panel-de-control/panel-de-control.module').then(m => m.PanelDeControlModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleado', component: CreateEmpleadoComponent },
  { path: 'editEmpleado/:id', component: CreateEmpleadoComponent },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
