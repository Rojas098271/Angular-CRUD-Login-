import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados', (ref: { orderBy: (arg0: string, arg1: string) => any; }) => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data:any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(data);
  }

}

