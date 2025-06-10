import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TasksService } from '../services/tasks.service';

export const tasksResolver: ResolveFn<any> = (route, state) => {
  const servicio = inject(TasksService);
  return servicio.getTareas();
};
