import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: ''
  }

  paises: any[] = [];

  constructor(private PaisService: PaisService) { }

  ngOnInit(): void {

    this.PaisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;
        this.paises.unshift({
          nombre: '[Select country]',
          codigo: ''
        })
        console.log(paises);
      });

  }

  guardar(forma: NgForm):void {

    if(forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })

      return;
    }
    console.log(forma);
  }

}
