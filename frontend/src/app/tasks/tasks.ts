import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoTasks } from './components/noTasks';
import { PendingTasks } from './components/pendingTasks';
import { CompletedTasks } from './components/completedTasks';
import { CreateTaskDialogComponent } from './components/createTaskDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskInterface, TasksService } from '../services/tasks.service';
import { SekeletonLoadTasks } from './components/skeletonTasks';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    NoTasks,
    PendingTasks,
    CompletedTasks,
    SekeletonLoadTasks,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.html',
  styles: ``,
})
export class Tasks {
  tasks: TaskInterface[] = [];
  skeletonLoad = true;

  constructor(private dialog: MatDialog, private rutaTasks: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks() {
    this.skeletonLoad = true;
    this.rutaTasks.getTareas().subscribe({
      next: (tareas: TaskInterface[]) => {
        console.log(tareas);
        this.tasks = tareas;
        this.skeletonLoad = false;
      },
      error: (err) => {
        alert(err.error.mensaje);
      },
    });
  }
  get pendingTasks() {
    return this.tasks.filter((task: any) => task.estado === 'pendiente');
  }
  get completedTasks() {
    return this.tasks.filter((task: any) => task.estado === 'completada');
  }
  openDialog(): void {
    const dialog = this.dialog.open(CreateTaskDialogComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Crear Tarea',
        descripcion: 'Crea una nueva tarea para tu lista',
        botonText: 'Crear Tarea',
        task: {},
        id: '',
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result?.taskCreated) {
        this.getAllTasks();
      }
    });
  }
  toogleComplete(task: TaskInterface): void {
    if (task.estado === 'pendiente') task.estado = 'completada';
    else task.estado = 'pendiente';
    console.log([
      task.id,
      task.titulo,
      task.descripcion,
      task.prioridad,
      task.fecha_limite.split('T')[0],
      task.estado,
    ]);
    this.rutaTasks
      .updateTarea(
        task.id,
        task.titulo,
        task.descripcion,
        task.prioridad,
        task.fecha_limite.split('T')[0],
        task.estado
      )
      .subscribe({
        next: (res: any) => {
          this.getAllTasks();
        },
        error: (err) => {
          alert(err.error.mensaje);
        },
      });
  }
}
