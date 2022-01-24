import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService,
             ) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }
  
  eliminarEmpleado(id: string) {
    Swal.fire({
      title: 'Estar seguro que quieres eliminar este registro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._empleadoService.eliminarEmpleado(id)
        Swal.fire(
          'Borrado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

}

 

