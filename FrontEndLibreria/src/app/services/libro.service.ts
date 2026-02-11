import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibroInterface } from '../interfaces/libro.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  RUTA_API = 'https://localhost:7275/api/Libro';

  constructor(private http: HttpClient) {}

  todos(): Observable<LibroInterface[]> {
    return this.http.get<any[]>(this.RUTA_API);
  }

  uno(idlibro: number): Observable<LibroInterface> {
    return this.http.get<LibroInterface>(this.RUTA_API + '/' + idlibro);
  }

  nuevo(libro: LibroInterface): Observable<LibroInterface> {
    return this.http.post<LibroInterface>(this.RUTA_API, libro);
  }

  editar(libro: LibroInterface): Observable<LibroInterface> {
    return this.http.put<LibroInterface>(this.RUTA_API + '/' + libro.id, libro);
  }

  eliminar(idlibro: number): Observable<any> {
    return this.http.delete(this.RUTA_API + '/' + idlibro);
  }
}
