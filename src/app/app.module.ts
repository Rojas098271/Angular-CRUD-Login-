import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { CreateEmpleadoComponent } from './create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreateEmpleadoComponent,
    ListEmpleadosComponent,
  ],
  imports: [
    provideFirestore(() => getFirestore()),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
