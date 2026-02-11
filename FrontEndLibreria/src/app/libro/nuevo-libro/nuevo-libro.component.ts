import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { LibroInterface } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-nuevo-libro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './nuevo-libro.component.html',
  styleUrl: './nuevo-libro.component.css',
})
export class NuevoLibroComponent {
  titulo = false;
  idLibro = 0;

  frmLibro: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    autor: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    genero: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    anio_publicacion: new FormControl<number | null>(null, [Validators.required]),
    stock: new FormControl<number | null>(null, [Validators.required]),
  });

  constructor(
    private libroServicio: LibroService,
    private rutas: Router,
    private parametros: ActivatedRoute,
  ) {
    this.parametros.paramMap.subscribe((valores) => {
      const id = Number(valores.get('id'));
      if (id > 0) {
        this.titulo = true;
        this.idLibro = id;
        this.libroServicio.uno(id).subscribe((libro) => {
          this.frmLibro.patchValue({
            titulo: libro.titulo,
            autor: libro.autor,
            genero: libro.genero,
            anio_publicacion: libro.anio_publicacion,
            stock: libro.stock,
          });
        });
      }
    });
  }

  guardar() {
    const datos = this.frmLibro.getRawValue();

    const libro: LibroInterface = {
      id: this.idLibro > 0 ? this.idLibro : undefined,
      titulo: (datos.titulo ?? '').toString().trim(),
      autor: (datos.autor ?? '').toString().trim(),
      genero: (datos.genero ?? '').toString().trim(),
      anio_publicacion: Number(datos.anio_publicacion),
      stock: Number(datos.stock),
    };

    if (this.idLibro > 0) {
      this.libroServicio.editar(libro).subscribe((response) => {
        if (response == null) {
          alert('Se actualizó con éxito');
          this.rutas.navigate(['libros/']);
        }
      });
    } else {
      this.libroServicio.nuevo(libro).subscribe((response) => {
        if (response) {
          alert('Se guardo con éxito');
          this.rutas.navigate(['libros/']);
        }
      });
    }
  }
}
