import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskInterface, TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'update-task-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './taskDialog.html',
  styles: [``],
})
export class UpdateTaskDialogComponent {
  titulo = '';
  tituloError = 'hidden';
  descripcion = '';
  prioridad = '';
  prioridadError = 'hidden';
  isLoading = false;
  fecha_limite: string | null = null;
  today = new Date().toISOString().split('T')[0];
  constructor(
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      titulo: string;
      descripcion: string;
      botonText: string;
      task: any | TaskInterface;
      id: string;
    }
  ) {}
  ngOnInit(): void {
    this.titulo = this.data.task.titulo;
    this.descripcion = this.data.task.descripcion;
    this.prioridad = this.data.task.prioridad;
    this.fecha_limite = this.data.task.fecha_limite.split('T')[0];
  }
  close(): void {
    this.dialogRef.close({ taskCreated: false });
  }
  verifyForm(): any {
    this.titulo = this.titulo.trim();
    this.descripcion = this.descripcion.trim();
    if (this.titulo === '') return (this.tituloError = '');
    else this.tituloError = 'hidden';
    if (this.prioridad === '') return (this.prioridadError = '');
    else this.prioridadError = 'hidden';
    this.updateForm();
  }
  updateForm() {
    this.isLoading = true;
    this.taskService
      .updateTarea(
        parseInt(this.data.id),
        this.titulo,
        this.descripcion,
        this.prioridad,
        this.fecha_limite,
        'pendiente'
      )
      .subscribe({
        next: (res: any) => {
          alert(res.mensaje);
          this.isLoading = false;
          this.dialogRef.close({ taskCreated: true });
        },
        error: (err) => {
          alert(err.error.mensaje);
          this.isLoading = false;
        },
      });
  }
}
