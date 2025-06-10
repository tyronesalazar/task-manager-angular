import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TaskInterface {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'completada' | string;
  prioridad: Prioridad;
  fecha_limite: string;
  creado_en: string;
  usuario_id: number;
}

export type Prioridad = 'alta' | 'media' | 'baja' | '';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlTasks = environment.apiUrl + 'api/tareas';
  constructor(private http: HttpClient) {}

  getTareas(): Observable<TaskInterface[]> {
    const tasks = this.http.get<TaskInterface[]>(this.urlTasks);
    return tasks;
  }
  createTarea(
    titulo: string,
    descripcion: string,
    prioridad: string,
    fecha_limite: string | null
  ) {
    const task: any = {
      titulo: titulo,
      descripcion: descripcion,
      estado: 'pendiente',
      prioridad: prioridad,
      fecha_limite: fecha_limite,
    };
    return this.http.post(this.urlTasks, task);
  }
  updateTarea(
    id: number,
    titulo: string,
    descripcion: string,
    prioridad: string,
    fecha_limite: string | null,
    estado: string
  ) {
    const task: any = {
      titulo: titulo,
      descripcion: descripcion,
      prioridad: prioridad,
      fecha_limite: fecha_limite,
      estado: estado,
    };
    return this.http.put(`${this.urlTasks}/${id}`, task);
  }
  deleteTarea(id: number) {
    return this.http.delete(`${this.urlTasks}/${id}`);
  }
}
