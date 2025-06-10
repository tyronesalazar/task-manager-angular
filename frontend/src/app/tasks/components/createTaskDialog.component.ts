import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskInterface, TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create-task-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './taskDialog.html',
  styles: [``],
})
export class CreateTaskDialogComponent {
  titulo = '';
  tituloError = 'hidden';
  descripcion = '';
  prioridad = '';
  prioridadError = 'hidden';
  isLoading = false;
  today = new Date().toISOString().split('T')[0];
  fecha_limite: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      titulo: string;
      descripcion: string;
      botonText: string;
      task: TaskInterface;
    }
  ) {}
  ngOnInit(): void {
    this.data.task.prioridad = '';
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
    this.submitForm();
  }
  submitForm() {
    this.isLoading = true;
    this.taskService
      .createTarea(
        this.titulo,
        this.descripcion,
        this.prioridad,
        this.fecha_limite
      )
      .subscribe({
        next: (res: any) => {
          alert(res.mensaje);
          this.dialogRef.close({ taskCreated: true });
          this.isLoading = false;
        },
        error: (err) => {
          alert(err.error.mensaje);
          this.dialogRef.close({ taskCreated: false });
          this.isLoading = false;
        },
      });
  }
}
