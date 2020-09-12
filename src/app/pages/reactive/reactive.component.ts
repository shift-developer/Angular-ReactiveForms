import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder,
              private validadores: ValidadoresService) { 

    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get hobbies() {
    return this.forma.get('hobbies') as FormArray;
  }

  get nombreNoValido():boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido():boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido():boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido():boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get estadoNoValido():boolean {
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched;
  }

  get ciudadNoValido():boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)] ],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noGonzalez] ],
      correo: ['', [Validators.required, Validators.email] ],
      usuario: ['', [Validators.required], this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        estado: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      hobbies: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    })
  }



  agregarHobbie() {
    this.hobbies.push(this.fb.control('') );
  }

  borrarHobbie(i: number) {
    this.hobbies.removeAt(i);
  }

  guardar() {
      if(this.forma.invalid) {
  
        return Object.values(this.forma.controls).forEach(control => {

          if(control instanceof FormGroup) {
            Object.values(control.controls).forEach(control => control.markAsTouched())
          } else {
            control.markAsTouched();
          }
          
        });
        
      }
      console.log(this.forma.value)
      this.forma.reset({
        "nombre": "",
        "apellido": "",
        "correo": "",
        });
      
  }


}
