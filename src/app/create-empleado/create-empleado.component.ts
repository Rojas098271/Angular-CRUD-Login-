import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,

    private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.createEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Empleado registrado exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })

      
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado(id: string) {

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,      
      fechaActualizacion: new Date()
    }

    this.loading = true;
 Swal.fire({
    title: 'Estas seguro que quieres guardar los cambios?',
    text: "No podras revertirlos!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, guardar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._empleadoService.actualizarEmpleado(id, empleado)
      Swal.fire(
        'Gurdado!',
        'Los cambios se han efectuado correctamente.',
        'success'
      )
      this.router.navigate(['/list-empleados']);
    }
  })   
   
  }

  esEditar() {
    this.titulo = 'Editar Empleado'
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

}

