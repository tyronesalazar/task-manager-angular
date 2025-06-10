//dialog for confirmation before deleting a task
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prioridad, TaskInterface } from '../../services/tasks.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-task-dialog',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="sm:max-w-md backdrop-blur-sm bg-white/95 p-6 rounded-xl">
      <div class="mb-4">
        <h2 class="text-xl font-bold text-red-600">Confirmar eliminación</h2>
        <p class="text-gray-600 mt-1">
          ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se
          puede deshacer.
        </p>
      </div>

      <div *ngIf="data.task" class="py-4">
        <div class="bg-gray-50 rounded-lg p-4 border">
          <h4 class="font-semibold text-gray-900 mb-1">
            {{ data.task.titulo }}
          </h4>
          <p *ngIf="data.task.descripcion" class="text-sm text-gray-600">
            {{ data.task.descripcion }}
          </p>
          <div class="mt-2">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1"
              [ngClass]="priorityColors[data.task.prioridad]"
            >
              <mat-icon class="w-3 h-3">flag</mat-icon>
              {{ priorityEmojis[data.task.prioridad] }}
              {{ data.task.prioridad }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          mat-stroked-button
          class="flex-1 h-12 rounded-xl"
          (click)="onCancel()"
        >
          Cancelar
        </button>
        <button
          mat-flat-button
          color="warn"
          class="flex-1 h-12 text-white font-medium rounded-xl shadow-lg shadow-red-500/25 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200"
          (click)="onConfirm()"
        >
          Eliminar tarea
        </button>
      </div>
    </div>
  `,
  styles: [``],
})
export class DeleteTaskDialog {
  priorityColors = {
    alta: 'bg-red-100 text-red-800 border-red-200',
    media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    baja: 'bg-green-100 text-green-800 border-green-200',
    '': 'bg-gray-100 text-gray-800 border-gray-200',
  };
  priorityEmojis: Record<Prioridad, string> = {
    alta: '🔴',
    media: '🟡',
    baja: '🟢',
    '': '⚪',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskInterface },
    public dialogRef: MatDialogRef<DeleteTaskDialog>
  ) {}

  onCancel(): void {
    this.dialogRef.close({ taskDeleted: false });
  }
  onConfirm(): void {
    this.dialogRef.close({ taskDeleted: true });
  }
  ngOnInit(): void {}
}
