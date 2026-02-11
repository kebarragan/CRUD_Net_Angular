import { Component, OnInit, signal } from '@angular/core';
import { LibroInterface } from '../interfaces/libro.interface';
import { LibroService } from '../services/libro.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-libro',
  imports: [RouterLink],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {
  listaLibros = signal<LibroInterface[]>([]);

  constructor(private readonly libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista() {
    this.libroService.todos().subscribe((lista) => {
      console.table(lista);
      this.listaLibros.set(Array.isArray(lista) ? lista : []);
    });
  }

  eliminar(id: number) {
    
        this.libroService.eliminar(id).subscribe((response) => {
          if (response == null) {
            alert('El libro fue eliminado con éxito');
            this.cargarLista();
          }
        });
  }
}