import { Routes } from '@angular/router';
import { LibroComponent } from './libro/libro.component';
import { NuevoLibroComponent } from './libro/nuevo-libro/nuevo-libro.component';

export const routes: Routes = [
    {
    path: '',
    component: LibroComponent,
    pathMatch: 'full',
  },
  {
    path: 'libros',
    component: LibroComponent,
  },
  {
    path: 'nuevolibro',
    component: NuevoLibroComponent,
  },
  {
    path: 'editarlibro/:id',
    component: NuevoLibroComponent,
  },
];
