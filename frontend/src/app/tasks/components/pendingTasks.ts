import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskDialogComponent } from './updateTaskDialog.component';
import { DeleteTaskDialog } from './deleteTaskDialog.component';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';

interface TaskInterface {
  creado_en: string;
  descripcion: string;
  estado: string;
  fecha_limite: string;
  id: number;
  prioridad: Prioridad;
  titulo: string;
  usuario_id: number;
}
type Prioridad = 'alta' | 'media' | 'baja' | '';
@Component({
  selector: 'app-pending-tasks',
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      @for (task of pendingTasks; track task.id) {
      <div
        class="backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl cursor-pointer"
      >
        <div class="p-6 flex justify-between">
          <div class="flex items-start space-x-4 flex-1">
            <button
              (click)="completeTask(task)"
              class="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">
                {{ task.titulo }}
              </h3>
              <p class="text-gray-600 text-sm mb-3">
                {{ task.descripcion }}
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium border {{
                    priorityColors[task.prioridad]
                  }}"
                >
                  {{ priorityEmojis[task.prioridad] }} {{ task.prioridad }}
                </span>
                <span
                  *ngIf="task.fecha_limite"
                  class="text-gray-500 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10m-9 4h6m2 5H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"
                    />
                  </svg>
                  {{ convertDate(task.fecha_limite) }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 ml-4">
            <button
              (click)="openUpdateDialog(task, task.id)"
              class="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded"
            >
              ✏️
            </button>
            <button
              (click)="openDeleteDialog(task)"
              class="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styles: [``],
})
export class PendingTasks {
  @Input() pendingTasks: TaskInterface[] = [];
  @Output() taskUpdated = new EventEmitter();
  @Output() taskCompleted = new EventEmitter();
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
  constructor(private dialog: MatDialog, private taskService: TasksService) {}

  convertDate(dateString: string): string {
    if (dateString === null || dateString === undefined) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  openUpdateDialog(task: TaskInterface, id: number): void {
    const dialog = this.dialog.open(UpdateTaskDialogComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Editar Tarea',
        descripcion: 'Modifica los detalles de tu tarea',
        botonText: 'Editar Tarea',
        task,
        id,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result?.taskCreated) {
        this.taskUpdated.emit();
      }
    });
  }
  openDeleteDialog(task: TaskInterface): void {
    const dialog = this.dialog.open(DeleteTaskDialog, {
      data: { task },
      panelClass: 'custom-dialog-container',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result?.taskDeleted) {
        this.taskService.deleteTarea(task.id).subscribe({
          next: (res: any) => {
            alert(res.mensaje);
            this.taskUpdated.emit();
          },
          error: (err) => {
            alert(err.error.mensaje);
          },
        });
      }
    });
  }
  completeTask(task: TaskInterface): void {
    this.taskCompleted.emit(task);
    task.estado = 'completada';
  }
}
